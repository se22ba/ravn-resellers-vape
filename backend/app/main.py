from collections import defaultdict
from datetime import datetime
import csv, io
from fastapi import FastAPI, Depends, HTTPException, Response
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session, joinedload
from sqlalchemy import func
from .config import get_settings
from .db import Base, engine, get_db, SessionLocal
from .models import LiquidLine, LiquidPrice, LiquidFlavor, Product, Order, OrderItem, OrderEvent, SupplierBatch
from .schemas import OrderCreate, AdminLogin, OrderAdminPatch, BatchCreate
from .seed import seed
from .auth import login, require_admin

settings = get_settings()
app = FastAPI(title=settings.app_name, version="1.0.0")
app.add_middleware(CORSMiddleware, allow_origins=settings.cors_list, allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

STATUSES = ["received","reviewed","awaiting_payment","paid","supplier_ordered","supplier_received","ready","delivered","cancelled"]
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
        "shipping": shipping, "subtotal": subtotal, "total": subtotal + shipping,
        "created_at": order.created_at.isoformat(), "updated_at": order.updated_at.isoformat(),
        "payment_reported": bool(order.payment_reported_at),
        "items": [{"id":i.id,"kind":i.kind,"name":i.snapshot_name,"quantity":i.quantity,
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

@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)
    db=SessionLocal()
    try: seed(db)
    finally: db.close()

@app.get("/api/health")
def health(): return {"ok":True,"service":settings.app_name}

@app.get("/api/catalog")
def catalog(db: Session=Depends(get_db)):
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
def create_order(payload: OrderCreate, db: Session=Depends(get_db)):
    order=Order(number="TEMP",customer_name=payload.customer_name.strip(),status="received")
    db.add(order); db.flush(); order.number=f"VV-{datetime.utcnow():%y%m%d}-{order.id:04d}"
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
    db.add(OrderEvent(order_id=order.id,event_type="created",detail="Pedido recibido desde la web"))
    db.commit()
    order=db.query(Order).options(joinedload(Order.items),joinedload(Order.events)).filter(Order.id==order.id).first()
    return order_view(order,public=True)

@app.get("/api/orders/public/{token}")
def public_order(token: str, db: Session=Depends(get_db)):
    order=db.query(Order).options(joinedload(Order.items),joinedload(Order.events)).filter(Order.public_token==token).first()
    if not order: raise HTTPException(404,"Pedido no encontrado")
    return order_view(order,public=True)

@app.post("/api/orders/public/{token}/payment-reported")
def payment_reported(token: str, db: Session=Depends(get_db)):
    order=db.query(Order).filter(Order.public_token==token).first()
    if not order: raise HTTPException(404,"Pedido no encontrado")
    if order.status!="awaiting_payment": raise HTTPException(400,"El pedido todavía no está esperando pago")
    order.payment_reported_at=datetime.utcnow()
    db.add(OrderEvent(order_id=order.id,event_type="payment_reported",detail="El cliente informó que realizó la transferencia"))
    db.commit(); return {"ok":True}

@app.post("/api/admin/login")
def admin_login(payload: AdminLogin): return {"token":login(payload.password)}

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
        db.add(OrderEvent(order_id=order.id,event_type="shipping_changed",detail=f"Envío actualizado a ${payload.shipping:,.0f}"))
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
