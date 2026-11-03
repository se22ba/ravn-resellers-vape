from collections import defaultdict
from datetime import datetime
import csv, io
from fastapi import FastAPI, Depends, HTTPException, Response, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session, joinedload
from sqlalchemy import func
from sqlalchemy.exc import IntegrityError
from .config import get_settings
from .db import Base, engine, get_db, SessionLocal
from .models import (
    LiquidLine, LiquidPrice, LiquidFlavor, Product, Order, OrderItem, OrderEvent,
    SupplierBatch, ClientAccess, OrderClientAccess, AdminUser
)
from .schemas import (
    OrderCreate, ClientLogin, ClientCreate, ClientPatch,
    AdminLogin, AdminUserCreate, AdminUserPatch, OrderAdminPatch, BatchCreate
)
from .seed import seed
from .auth import (
    login, require_admin, login_client, require_client,
    normalize_username, normalize_phone, hash_password, seed_admins
)
from .notifications import send_new_order_email

settings = get_settings()
app = FastAPI(title="Private API", version="1.1.0", docs_url=None, redoc_url=None, openapi_url=None)
app.add_middleware(CORSMiddleware, allow_origins=settings.cors_list, allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

STATUSES = ["received","reviewed","awaiting_payment","paid","supplier_ordered","supplier_received","ready","delivered","cancelled"]
CLIENT_EDITABLE_STATUSES = {"received","reviewed","awaiting_payment","paid"}
STATUS_LABELS = {
    "received":"Recibido","reviewed":"Revisado","awaiting_payment":"Esperando pago","paid":"Pagado",
    "supplier_ordered":"Pedido a proveedor","supplier_received":"Recibido de proveedor",
    "ready":"Listo para entregar","delivered":"Entregado","cancelled":"Cancelado"
}

def money(v): return float(v or 0)

def tier_total(product: Product, qty: int) -> float:
    tiers = sorted(product.price_tiers or [], key=lambda x: int(x["qty"]), reverse=True)
    if not tiers: return money(product.sale) * qty
    remaining, total = qty, 0.0
    for t in tiers:
        pack = int(t["qty"]); count = remaining // pack
        total += count * float(t["total"]); remaining -= count * pack
    if remaining: total += remaining * money(product.sale)
    return total

def order_view(order: Order, public=False):
    subtotal = sum(money(i.line_total_sale) for i in order.items)
    cost = sum(money(i.line_total_cost) for i in order.items)
    shipping = money(order.shipping)
    data = {
        "id": order.id, "number": order.number, "public_token": order.public_token,
        "customer_name": order.customer_name, "status": order.status,
        "status_label": STATUS_LABELS.get(order.status, order.status),
        "editable": order.status in CLIENT_EDITABLE_STATUSES,
        "shipping": shipping, "subtotal": subtotal, "total": subtotal + shipping,
        "created_at": order.created_at.isoformat(), "updated_at": order.updated_at.isoformat(),
        "payment_reported": bool(order.payment_reported_at),
        "items": [{"id":i.id,"kind":i.kind,"reference_id":i.reference_id,"name":i.snapshot_name,"quantity":i.quantity,
            "unit_sale":money(i.unit_sale),"line_total_sale":money(i.line_total_sale),
            "line_name":i.line_name,"flavor":i.flavor,"size_ml":i.size_ml,"nicotine_mg":i.nicotine_mg}
            for i in order.items],
        "events": [{"type":e.event_type,"detail":e.detail,"created_at":e.created_at.isoformat()} for e in order.events],
    }
    if not public:
        data.update({"cost":cost,"profit":subtotal-cost})
        for out,item in zip(data["items"],order.items):
            out["unit_cost"]=money(item.unit_cost); out["line_total_cost"]=money(item.line_total_cost)
            out["profit"]=money(item.line_total_sale)-money(item.line_total_cost)
    if public and order.status in {"awaiting_payment","paid","supplier_ordered","supplier_received","ready","delivered"}:
        data["payment"]={"alias":settings.payment_alias,"holder":settings.payment_holder,"cvu":settings.payment_cvu}
    return data

def ensure_client_order(db: Session, order: Order, client: dict):
    link = db.query(OrderClientAccess).filter(
        OrderClientAccess.order_id == order.id,
        OrderClientAccess.client_id == client["id"]
    ).first()
    if not link:
        raise HTTPException(403, "Este pedido no pertenece a tu cuenta")

@app.on_event("startup")
def startup():
    if engine.dialect.name == "postgresql" and settings.db_schema:
        safe_schema = settings.db_schema.replace('"', '""')
        with engine.begin() as conn:
            conn.exec_driver_sql(f'CREATE SCHEMA IF NOT EXISTS "{safe_schema}"')
    Base.metadata.create_all(bind=engine)
    db=SessionLocal()
    try:
        seed(db)
        seed_admins(db)
    finally: db.close()

@app.get("/api/health")
def health(): return {"ok":True}

@app.post("/api/client/login")
def client_login(payload: ClientLogin, db: Session=Depends(get_db)):
    return login_client(payload.username, payload.phone, db)

@app.get("/api/client/me")
def client_me(client: dict=Depends(require_client)):
    return {"id":client["id"],"username":client["username"]}

@app.get("/api/client/orders")
def client_orders(client: dict=Depends(require_client), db: Session=Depends(get_db)):
    orders=(db.query(Order)
        .join(OrderClientAccess, OrderClientAccess.order_id == Order.id)
        .options(joinedload(Order.items), joinedload(Order.events))
        .filter(OrderClientAccess.client_id == client["id"], Order.status!="cancelled")
        .order_by(Order.created_at.desc())
        .all())
    return [order_view(order, public=True) for order in orders]

@app.get("/api/catalog")
def catalog(client: dict=Depends(require_client), db: Session=Depends(get_db)):
    lines=db.query(LiquidLine).options(joinedload(LiquidLine.flavors),joinedload(LiquidLine.prices)).filter(LiquidLine.active==True).all()
    products=db.query(Product).filter(Product.active==True).order_by(Product.category,Product.sort_order).all()
    return {
        "liquid_lines":[{"id":l.id,"slug":l.slug,"name":l.name,"nicotine_options":l.nicotine_options,
            "flavors":sorted([f.name for f in l.flavors if f.active]),
            "prices":sorted([{"size_ml":p.size_ml,"sale":money(p.sale)} for p in l.prices],key=lambda x:x["size_ml"])} for l in lines],
        "products":[{"id":p.id,"sku":p.sku,"name":p.name,"category":p.category,"sale":money(p.sale),
            "image_url":p.image_url,"price_tiers":p.price_tiers or []} for p in products]
    }

@app.post("/api/orders")
def create_order(payload: OrderCreate, background_tasks: BackgroundTasks, client: dict=Depends(require_client), db: Session=Depends(get_db)):
    order=Order(number="TEMP",customer_name=client["username"],status="received")
    db.add(order); db.flush(); order.number=f"VV-{datetime.utcnow():%y%m%d}-{order.id:04d}"
    db.add(OrderClientAccess(order_id=order.id, client_id=client["id"]))
    for it in payload.items:
        if it.kind=="liquid":
            line=db.query(LiquidLine).filter(LiquidLine.slug==it.line_slug,LiquidLine.active==True).first()
            if not line or not it.flavor or it.size_ml is None or it.nicotine_mg is None:
                raise HTTPException(400,"Líquido incompleto")
            if it.nicotine_mg not in (line.nicotine_options or []):
                raise HTTPException(400,"MG de nicotina no válido")
            fl=db.query(LiquidFlavor).filter(LiquidFlavor.line_id==line.id,func.lower(LiquidFlavor.name)==it.flavor.lower(),LiquidFlavor.active==True).first()
            price=db.query(LiquidPrice).filter(LiquidPrice.line_id==line.id,LiquidPrice.size_ml==it.size_ml).first()
            if not fl or not price: raise HTTPException(400,"Sabor o medida no válido")
            uc,us=money(price.cost),money(price.sale); total_c,total_s=uc*it.quantity,us*it.quantity
            name=f"{line.name} · {fl.name} · {it.size_ml}ml · {it.nicotine_mg}mg"
            db.add(OrderItem(order_id=order.id,kind="liquid",reference_id=line.id,snapshot_name=name,line_name=line.name,
                flavor=fl.name,size_ml=it.size_ml,nicotine_mg=it.nicotine_mg,quantity=it.quantity,
                unit_cost=uc,unit_sale=us,line_total_cost=total_c,line_total_sale=total_s))
        elif it.kind=="product":
            p=db.get(Product,it.reference_id)
            if not p or not p.active: raise HTTPException(400,"Producto no válido")
            total_s=tier_total(p,it.quantity); total_c=total_s
            unit=total_s/it.quantity
            db.add(OrderItem(order_id=order.id,kind="product",reference_id=p.id,snapshot_name=p.name,quantity=it.quantity,
                unit_cost=unit,unit_sale=unit,line_total_cost=total_c,line_total_sale=total_s))
        else: raise HTTPException(400,"Tipo de item no válido")
    db.add(OrderEvent(order_id=order.id,event_type="created",detail=f"Pedido recibido desde la cuenta {client['username']}"))
    db.commit()
    order=db.query(Order).options(joinedload(Order.items),joinedload(Order.events)).filter(Order.id==order.id).first()
    view=order_view(order,public=True)
    background_tasks.add_task(
        send_new_order_email,
        order.number,
        order.customer_name,
        view["total"],
        [{"quantity":i["quantity"],"name":i["name"],"line_total":i["line_total_sale"]} for i in view["items"]],
    )
    return view

@app.get("/api/orders/public/{token}")
def public_order(token: str, client: dict=Depends(require_client), db: Session=Depends(get_db)):
    order=db.query(Order).options(joinedload(Order.items),joinedload(Order.events)).filter(Order.public_token==token).first()
    if not order: raise HTTPException(404,"Pedido no encontrado")
    ensure_client_order(db,order,client)
    return order_view(order,public=True)

@app.put("/api/orders/public/{token}")
def edit_public_order(token: str, payload: OrderCreate, client: dict=Depends(require_client), db: Session=Depends(get_db)):
    order=db.query(Order).options(joinedload(Order.items),joinedload(Order.events)).filter(Order.public_token==token).first()
    if not order: raise HTTPException(404,"Pedido no encontrado")
    ensure_client_order(db,order,client)
    if order.status not in CLIENT_EDITABLE_STATUSES:
        raise HTTPException(409,"El pedido ya fue enviado al proveedor y no puede modificarse")

    new_items=[]
    for it in payload.items:
        if it.kind=="liquid":
            line=db.query(LiquidLine).filter(LiquidLine.slug==it.line_slug,LiquidLine.active==True).first()
            if not line or not it.flavor or it.size_ml is None or it.nicotine_mg is None:
                raise HTTPException(400,"Líquido incompleto")
            if it.nicotine_mg not in (line.nicotine_options or []):
                raise HTTPException(400,"MG de nicotina no válido")
            fl=db.query(LiquidFlavor).filter(LiquidFlavor.line_id==line.id,func.lower(LiquidFlavor.name)==it.flavor.lower(),LiquidFlavor.active==True).first()
            price=db.query(LiquidPrice).filter(LiquidPrice.line_id==line.id,LiquidPrice.size_ml==it.size_ml).first()
            if not fl or not price: raise HTTPException(400,"Sabor o medida no válido")
            uc,us=money(price.cost),money(price.sale)
            new_items.append(OrderItem(order_id=order.id,kind="liquid",reference_id=line.id,
                snapshot_name=f"{line.name} · {fl.name} · {it.size_ml}ml · {it.nicotine_mg}mg",
                line_name=line.name,flavor=fl.name,size_ml=it.size_ml,nicotine_mg=it.nicotine_mg,
                quantity=it.quantity,unit_cost=uc,unit_sale=us,
                line_total_cost=uc*it.quantity,line_total_sale=us*it.quantity))
        elif it.kind=="product":
            p=db.get(Product,it.reference_id)
            if not p or not p.active: raise HTTPException(400,"Producto no válido")
            total_s=tier_total(p,it.quantity); unit=total_s/it.quantity
            new_items.append(OrderItem(order_id=order.id,kind="product",reference_id=p.id,
                snapshot_name=p.name,quantity=it.quantity,unit_cost=unit,unit_sale=unit,
                line_total_cost=total_s,line_total_sale=total_s))
        else:
            raise HTTPException(400,"Tipo de item no válido")

    db.query(OrderItem).filter(OrderItem.order_id==order.id).delete(synchronize_session=False)
    db.flush()
    db.add_all(new_items)
    db.add(OrderEvent(order_id=order.id,event_type="client_edited",detail="Pedido modificado por el cliente"))
    db.commit()
    order=db.query(Order).options(joinedload(Order.items),joinedload(Order.events)).filter(Order.id==order.id).first()
    return order_view(order,public=True)

@app.delete("/api/orders/public/{token}")
def delete_public_order(token: str, client: dict=Depends(require_client), db: Session=Depends(get_db)):
    order=db.query(Order).options(joinedload(Order.events)).filter(Order.public_token==token).first()
    if not order: raise HTTPException(404,"Pedido no encontrado")
    ensure_client_order(db,order,client)
    if order.status not in CLIENT_EDITABLE_STATUSES:
        raise HTTPException(409,"El pedido ya fue enviado al proveedor y no puede eliminarse")
    previous=STATUS_LABELS.get(order.status,order.status)
    order.status="cancelled"
    db.add(OrderEvent(order_id=order.id,event_type="client_cancelled",detail=f"Pedido eliminado por el cliente (estado anterior: {previous})"))
    db.commit()
    return {"ok":True,"number":order.number}

@app.post("/api/orders/public/{token}/payment-reported")
def payment_reported(token: str, client: dict=Depends(require_client), db: Session=Depends(get_db)):
    order=db.query(Order).filter(Order.public_token==token).first()
    if not order: raise HTTPException(404,"Pedido no encontrado")
    ensure_client_order(db,order,client)
    if order.status!="awaiting_payment": raise HTTPException(400,"El pedido todavía no está esperando pago")
    order.payment_reported_at=datetime.utcnow()
    db.add(OrderEvent(order_id=order.id,event_type="payment_reported",detail="El cliente informó que realizó la transferencia"))
    db.commit(); return {"ok":True}

@app.post("/api/admin/login")
def admin_login(payload: AdminLogin, db: Session=Depends(get_db)): return {"token":login(payload.username, payload.password, db)}

@app.get("/api/admin/users/admins")
def admin_users(admin: dict=Depends(require_admin), db: Session=Depends(get_db)):
    rows=db.query(AdminUser).order_by(AdminUser.username).all()
    return [{"id":a.id,"username":a.username,"active":a.active,"created_at":a.created_at.isoformat(),"current":a.id==admin["id"]} for a in rows]

@app.post("/api/admin/users/admins")
def admin_create_user(payload: AdminUserCreate, admin: dict=Depends(require_admin), db: Session=Depends(get_db)):
    username=normalize_username(payload.username)
    if db.query(AdminUser).filter(AdminUser.username==username).first():
        raise HTTPException(409,"Ese administrador ya existe")
    row=AdminUser(username=username,password_hash=hash_password(payload.password),active=True)
    db.add(row)
    try:
        db.commit(); db.refresh(row)
    except IntegrityError:
        db.rollback()
        raise HTTPException(409,"Ese administrador ya existe")
    return {"id":row.id,"username":row.username,"active":row.active,"created_at":row.created_at.isoformat(),"current":False}

@app.patch("/api/admin/users/admins/{admin_id}")
def admin_patch_user(admin_id:int,payload:AdminUserPatch,admin:dict=Depends(require_admin),db:Session=Depends(get_db)):
    row=db.get(AdminUser,admin_id)
    if not row: raise HTTPException(404,"Administrador no encontrado")
    if payload.active is False and row.id==admin["id"]:
        raise HTTPException(409,"No podés bloquear tu propia cuenta")
    if payload.active is False and row.active:
        active_count=db.query(AdminUser).filter(AdminUser.active==True).count()
        if active_count<=1:
            raise HTTPException(409,"Debe quedar al menos un administrador activo")
    if payload.username is not None:
        row.username=normalize_username(payload.username)
    if payload.password is not None:
        row.password_hash=hash_password(payload.password)
    if payload.active is not None:
        row.active=payload.active
    try:
        db.commit(); db.refresh(row)
    except IntegrityError:
        db.rollback()
        raise HTTPException(409,"Ese nombre de administrador ya está en uso")
    return {"id":row.id,"username":row.username,"active":row.active,"created_at":row.created_at.isoformat(),"current":row.id==admin["id"]}

@app.get("/api/admin/catalog",dependencies=[Depends(require_admin)])
def admin_catalog(db: Session=Depends(get_db)):
    lines=db.query(LiquidLine).options(joinedload(LiquidLine.flavors),joinedload(LiquidLine.prices)).filter(LiquidLine.active==True).all()
    products=db.query(Product).filter(Product.active==True).order_by(Product.category,Product.sort_order).all()
    return {
        "liquid_lines":[{"id":l.id,"slug":l.slug,"name":l.name,"nicotine_options":l.nicotine_options,
            "flavors":sorted([f.name for f in l.flavors if f.active]),
            "prices":sorted([{"size_ml":p.size_ml,"cost":money(p.cost),"sale":money(p.sale),
                "profit":money(p.sale)-money(p.cost)} for p in l.prices],key=lambda x:x["size_ml"])} for l in lines],
        "products":[{"id":p.id,"sku":p.sku,"name":p.name,"category":p.category,
            "cost":money(p.cost),"sale":money(p.sale),"profit":money(p.sale)-money(p.cost),
            "image_url":p.image_url,"price_tiers":p.price_tiers or []} for p in products]
    }

@app.get("/api/admin/clients",dependencies=[Depends(require_admin)])
def admin_clients(db: Session=Depends(get_db)):
    rows=db.query(ClientAccess).order_by(ClientAccess.username).all()
    return [{"id":c.id,"username":c.username,"phone":c.phone,"active":c.active,"created_at":c.created_at.isoformat()} for c in rows]

@app.post("/api/admin/clients",dependencies=[Depends(require_admin)])
def admin_create_client(payload: ClientCreate, db: Session=Depends(get_db)):
    username=normalize_username(payload.username)
    phone=normalize_phone(payload.phone)
    if len(phone)<6: raise HTTPException(400,"Número de teléfono inválido")
    client=ClientAccess(username=username,phone=phone,active=True)
    db.add(client)
    try:
        db.commit(); db.refresh(client)
    except IntegrityError:
        db.rollback()
        raise HTTPException(409,"El usuario o teléfono ya está registrado")
    return {"id":client.id,"username":client.username,"phone":client.phone,"active":client.active}

@app.patch("/api/admin/clients/{client_id}",dependencies=[Depends(require_admin)])
def admin_patch_client(client_id:int,payload:ClientPatch,db:Session=Depends(get_db)):
    client=db.get(ClientAccess,client_id)
    if not client: raise HTTPException(404,"Cliente no encontrado")
    if payload.username is not None: client.username=normalize_username(payload.username)
    if payload.phone is not None:
        phone=normalize_phone(payload.phone)
        if len(phone)<6: raise HTTPException(400,"Número de teléfono inválido")
        client.phone=phone
    if payload.active is not None: client.active=payload.active
    try:
        db.commit(); db.refresh(client)
    except IntegrityError:
        db.rollback()
        raise HTTPException(409,"El usuario o teléfono ya está registrado")
    return {"id":client.id,"username":client.username,"phone":client.phone,"active":client.active}

@app.get("/api/admin/orders",dependencies=[Depends(require_admin)])
def admin_orders(db: Session=Depends(get_db)):
    orders=db.query(Order).options(joinedload(Order.items),joinedload(Order.events)).order_by(Order.created_at.desc()).all()
    return [order_view(o) for o in orders]

@app.patch("/api/admin/orders/{order_id}",dependencies=[Depends(require_admin)])
def patch_order(order_id:int,payload:OrderAdminPatch,db:Session=Depends(get_db)):
    order=db.query(Order).options(joinedload(Order.items),joinedload(Order.events)).filter(Order.id==order_id).first()
    if not order: raise HTTPException(404,"Pedido no encontrado")
    if payload.shipping is not None and float(order.shipping)!=payload.shipping:
        order.shipping=payload.shipping
        db.add(OrderEvent(order_id=order.id,event_type="shipping_changed",detail=f"Envío actualizado a ARS {payload.shipping:,.0f}"))
    if payload.status is not None:
        if payload.status not in STATUSES: raise HTTPException(400,"Estado inválido")
        if payload.status!=order.status:
            old=STATUS_LABELS.get(order.status,order.status); new=STATUS_LABELS[payload.status]
            order.status=payload.status
            db.add(OrderEvent(order_id=order.id,event_type="status_changed",detail=f"Estado: {old} → {new}"))
    db.commit()
    order=db.query(Order).options(joinedload(Order.items),joinedload(Order.events)).filter(Order.id==order.id).first()
    return order_view(order)

@app.get("/api/admin/metrics",dependencies=[Depends(require_admin)])
def metrics(db: Session=Depends(get_db)):
    orders=db.query(Order).options(joinedload(Order.items)).filter(Order.status!="cancelled").all()
    sales=sum(sum(money(i.line_total_sale) for i in o.items) for o in orders)
    cost=sum(sum(money(i.line_total_cost) for i in o.items) for o in orders)
    shipping=sum(money(o.shipping) for o in orders)
    return {"orders":len(orders),"sales":sales,"cost":cost,"profit":sales-cost,"shipping":shipping,
        "new":sum(1 for o in orders if o.status=="received")}

@app.post("/api/admin/supplier-batches",dependencies=[Depends(require_admin)])
def create_batch(payload:BatchCreate,db:Session=Depends(get_db)):
    orders=db.query(Order).options(joinedload(Order.items)).filter(Order.id.in_(payload.order_ids)).all()
    if len(orders)!=len(set(payload.order_ids)): raise HTTPException(400,"Hay pedidos inválidos")
    batch=SupplierBatch(number="TEMP",order_ids=payload.order_ids,extra_items=payload.extra_items)
    db.add(batch); db.flush(); batch.number=f"ANU-{datetime.utcnow():%y%m%d}-{batch.id:03d}"
    for o in orders:
        if o.status in {"received","reviewed","awaiting_payment","paid"}:
            o.status="supplier_ordered"
            db.add(OrderEvent(order_id=o.id,event_type="supplier_batch",detail=f"Incluido en {batch.number}"))
    db.commit(); db.refresh(batch)
    return batch_export_payload(batch,orders)

def batch_export_payload(batch:SupplierBatch,orders:list[Order]):
    grouped=defaultdict(int)
    for o in orders:
        for i in o.items: grouped[i.snapshot_name]+=i.quantity
    for x in batch.extra_items or []: grouped[str(x.get("name","Extra"))]+=int(x.get("quantity",1))
    rows=[{"name":name,"quantity":qty} for name,qty in sorted(grouped.items())]
    text="\n".join(f"{r['quantity']} x {r['name']}" for r in rows)
    return {"id":batch.id,"number":batch.number,"rows":rows,"text":text,"created_at":batch.created_at.isoformat()}

@app.get("/api/admin/supplier-batches/{batch_id}/export",dependencies=[Depends(require_admin)])
def export_batch(batch_id:int,format:str="txt",db:Session=Depends(get_db)):
    batch=db.get(SupplierBatch,batch_id)
    if not batch: raise HTTPException(404,"Ronda no encontrada")
    orders=db.query(Order).options(joinedload(Order.items)).filter(Order.id.in_(batch.order_ids)).all()
    payload=batch_export_payload(batch,orders)
    if format=="csv":
        s=io.StringIO(); w=csv.writer(s); w.writerow(["Cantidad","Producto"])
        for r in payload["rows"]: w.writerow([r["quantity"],r["name"]])
        return Response(s.getvalue(),media_type="text/csv",headers={"Content-Disposition":f'attachment; filename="{batch.number}.csv"'})
    return Response(payload["text"],media_type="text/plain; charset=utf-8",headers={"Content-Disposition":f'attachment; filename="{batch.number}.txt"'})
