from sqlalchemy.orm import Session
from .models import LiquidLine, LiquidFlavor, LiquidPrice, Product

FREEBASE_NICO = [0, 3, 6]  # Provisional hasta confirmar todos los MG ofrecidos por Anubis.

LIQUIDS = {
    "tradicional": {"name":"Tradicional","nico":FREEBASE_NICO,"prices":[(30,2900,5500),(60,5050,9200),(120,9200,15500),(250,15500,28000)],"flavors":[
        "Cafe al Rhum","Cafe al Whisky","Cafe con Crema","Caramel Capuchino","Crema de Menta","Crema Irlandesa","Ecto","Kilua","Menta","Mentol","Mojito","Red Bull","Triple Mentol","Vainilla al Rhum",
        "Anana","Banana","Banana Frozen","Blueberry","Cherry","Dragon Fruit","Frutilla","Frutillas Ripes","Fruits del Bosque","Kiwi Doble","Manzana Doble","Melon","Naranja","Pera","Pomelo Rosado","Razberry","Sandia","Uva","Yumberry",
        "Blendt de Menta","Berry Crunch","Captain Cereal","Caramelo con Limon","Dulce de Leche","Frutti Loops","Hazelnut","Marraquesh","Mint Candy","Monkey Fart","Pie Crust","Unicorn Vomit",
        "Banana Cream","Banana Split","Butter Toffees","Cheesecake G. Crust","Chococo","Cocoa","Double Chocolate","Durazno con Crema","French Vainilla","Frutillas con Crema","Merengue Limon","Mouse de Chocolate","Nutella","Vainilla Cream",
        "Americano","Asian RY4","Burley","Cavendish","Coumarine Pipe","Double RY4","Golden Virginia","Honey Pipe","Mild Black","Red Type Blend","RY4 Capuchino","RY4 Mentol","Strong","Sweet Cuban","Tabaco Cubano","Western"]},
    "premium": {"name":"Premium","nico":FREEBASE_NICO,"prices":[(30,4600,7500),(60,8550,13900),(120,16000,25000),(250,29000,44000)],"flavors":[
        "555","777","7UP","Aguila","Akkenaton","Amon","Anubeca","Anubis Cigarette","Anubis Flan","Anubis Gum","Anubis Milk","Anubis RY4","Anuket","Apofis","Artik","Asthor","Atom","Cleopatra","Coffe Latte","Cuba Free","Deluxe","Desert Ship","Felippe","Felippe Mentolado","Forest Ice","Frog Bloop","Gala","Horus","Isis","Kalerb","Karnak","Keops","Lemon Dry","Lyptus","Malibu","Marlboro","Merengada","Monkey Rhum","Nefertiti","Neftis","Nilo","Nona Milk","Nui","Osiris","Pico Dulce","Ra","RY4 Hazelnut","Seb","Seth","Sobek","Tabaco Cocoa","Turbok","USA Blend","USA Mixer","Vainilla Tobacco"]},
    "clon": {"name":"Clon","nico":FREEBASE_NICO,"prices":[(30,5100,9800),(60,9500,17000),(120,18000,29000),(250,32000,50000)],"flavors":[
        "ASAP Grape","Bluebird","Boss Reserve","Capone","Castle Long","Churrios","Dragon Blood","Duchess","Fat Boy","Love Cookies","Lemon Tart","Looper","Midnight Apple","Milkman","Monster Melons","Mother Milk","My Man","Prime 15","Sugar Drizzle","Tribeca","Unicorn Milk","Venus"]},
    "salts": {"name":"S.A.L.T.S.","nico":[25],"prices":[(30,8500,16000)],"flavors":["Anubeca","Artik","DRY4","Forest Ice","Marlboro","Tribeca","Yumberry"]},
    "galaxy": {"name":"Galaxy","nico":FREEBASE_NICO,"prices":[(60,8500,16000)],"flavors":["Mercurio","Venus","Tierra","Marte","Jupiter","Saturno","Urano"]},
}

PRODUCTS = [
("EQ-XROS-MINI","XROS Mini","Equipos",90000,"https://cdn.shopify.com/s/files/1/0703/9873/8521/files/xros-mini-10_3.png",None),
("EQ-XROS5-MINI","XROS 5 Mini","Equipos",80000,"https://store.vaporesso.com/cdn/shop/files/XROS5MINI-Titaniumsilver.png?v=1783424623&width=900",None),
("EQ-XROS5-NANO","XROS 5 Nano","Equipos",110000,None,None),("EQ-XROS5","XROS 5","Equipos",115000,None,None),("EQ-XROS6-MINI","XROS 6 Mini","Equipos",85000,None,None),("EQ-XROS6","XROS 6","Equipos",110000,None,None),
("EQ-ARGUS-G2-MINI","Argus G2 Mini","Equipos",45000,None,None),("EQ-ARGUS-G3","Argus G3","Equipos",85000,None,None),("EQ-ARGUS-Z2","Argus Z2","Equipos",45000,None,None),("EQ-LUXE-XR3","Luxe XR 3","Equipos",140000,None,None),
("EQ-DRAG-H40-PRO","Drag H40 Pro","Equipos",120000,None,None),("EQ-DRAG-X3","Drag X3","Equipos",140000,None,None),("EQ-DRAG5","Drag 5","Equipos",270000,None,None),("EQ-DRAG6","Drag 6","Equipos",290000,None,None),
("EQ-VAPEPEN-PROMO","Vape Pen V2 Kit + Liq.","Promo equipos",45000,None,None),("EQ-KOKO-PRIME","Koko Prime","Promo equipos",35000,None,None),("EQ-VINCI-Q","Vinci Q","Promo equipos",35000,None,None),
("ATO-AMMIT-RDA","Ammit RDA","Atomizadores",31800,None,None),("ATO-REBIRTH-RDA","Rebirth RDA","Atomizadores",55000,None,None),("ATO-PROFILE-RDTA","Profile RDTA","Atomizadores",95000,None,None),("ATO-DEAD-RABBIT","Dead Rabbit","Atomizadores",99000,None,None),
("CH-EFEST-K2","Efest K2","Cargadores",30000,None,None),("BAT-VTC6","VTC6","Pilas 18650",17000,None,None),
("REP-TARGET","Rep. Target","Repuestos",16500,None,None),("REP-LUXE-XR-5ML","Luxe XR 5ML","Repuestos",9000,None,None),
("ACC-RESI-REP","Resi reparable","Accesorios",9500,None,None),("ACC-PIREX","Pirex","Accesorios",9000,None,None),("ACC-PINZA","Pinza","Accesorios",6000,None,None),("ACC-DRIP510","Drip 510","Accesorios",8000,None,None),("ACC-DRIP810","Drip 810","Accesorios",5800,None,None),("ACC-WRAPS","Wraps","Accesorios",1200,None,None),("ACC-CABLE-USB","Cable USB","Accesorios",5000,None,None),("ACC-CAJA-HERR","Caja herr.","Accesorios",30000,None,None),
("RES-RPM","RPM","Resistencias",8600,None,None),("RES-RPM2","RPM 2","Resistencias",8600,None,None),("RES-GTX","GTX","Resistencias",11000,None,None),("RES-NOVO","Novo","Resistencias",11000,None,None),("RES-NORD","Nord","Resistencias",8000,None,None),("RES-TPP","TPP","Resistencias",13000,None,None),("RES-PNP","PNP","Resistencias",11000,None,None),("RES-PNPX","PNP X","Resistencias",11000,None,None),("RES-GT-MESH","GT Mesh","Resistencias",11000,None,None),("RES-GTI-MESH","GTI Mesh","Resistencias",11000,None,None),("RES-RBA-V8","RBA V8","Resistencias",25000,None,None),("RES-VINCI-Q","Vinci Q","Resistencias",14000,None,None),("RES-ELEAF-HW1","Eleaf HW1","Resistencias",7500,None,None),("RES-XROS-SERIES","XROS Series","Resistencias",11000,None,None),("RES-VMATE-CART","VMate Cart.","Resistencias",8400,None,None),("RES-GTX-RBA","GTX RBA","Resistencias",30000,None,None),("RES-LP1","LP1 (Novo 4)","Resistencias",9000,None,None),("RES-VAPE-PEN","Vape Pen","Resistencias",9000,None,None),("RES-A2S","A2S","Resistencias",9000,None,None),("RES-KOKO","Koko","Resistencias",12000,None,None),("RES-V12-PRINCE","V12 Prince","Resistencias",13000,None,None),("RES-NOVO-X","Novo X","Resistencias",9500,None,None),("RES-ARGUS-G2","Argus G2","Resistencias",10000,None,None),("RES-ZSERIES","Z-Series","Resistencias",12000,None,None),
("DIS-IGNITE15K","Ignite 15K","Descartables",35000,None,None),("DIS-IGNITE25K","Ignite 25K","Descartables",45000,None,None),("DIS-LOSTMARY20K","Lost Mary 20K","Descartables",43000,None,None),("DIS-LOSGAL25K","Losgal 25K","Descartables",35000,None,None),("DIS-LUFFBAR40K","Luffbar 40K","Descartables",40000,None,None),("DIS-BLVK45K","BL VK 45K","Descartables",48000,None,None),
("COT-CORDONES","Cordones x uni","Cottons",1500,None,None),("COT-NASTY","Cotton Nasty","Cottons",19000,None,None),("SALT-MASKKING","Maskking","Salt import",28000,None,None),
("PROMO-VPLAY-RETRO20K","V Play Retro 20K","Promos descartables",17000,None,[{"qty":1,"total":17000},{"qty":2,"total":30000}]),
("PROMO-IGNITE-VMIX40K","Ignite V-Mix 40K","Promos descartables",45000,None,[{"qty":1,"total":45000},{"qty":2,"total":85000}]),
("PROMO-IGNITE-TABACO8K","Ignite Tabaco 8K","Promos descartables",35000,None,None),("PROMO-IGNITE-VSWEET40K","Ignite V Sweet 40K","Promos descartables",40000,None,None),
("PROMO-ELFBAR-TRIO40K","Elfbar Trio 40K","Promos descartables",33000,None,[{"qty":1,"total":33000},{"qty":2,"total":60000}]),
("PROMO-ELFBAR-TE30K","Elfbar TE 30K","Promos descartables",36000,None,[{"qty":1,"total":36000},{"qty":2,"total":70000}]),
("PROMO-MASKKING-VMAX20K","Maskking V Max 20K","Promos descartables",20000,None,[{"qty":1,"total":20000},{"qty":2,"total":38000}]),
("PROMO-MASKKING-LENOX15K","Maskking Lenox 15K","Promos descartables",17000,None,[{"qty":1,"total":17000},{"qty":2,"total":30000}]),
("PROMO-SMOK-SPACEMAN25K","Smok Spaceman 25K","Promos descartables",25000,None,[{"qty":1,"total":25000},{"qty":2,"total":48000}]),
("PROMO-SMOK-PRIVBAR","Smok Privbar","Promos descartables",20000,None,[{"qty":1,"total":20000},{"qty":2,"total":38000}]),
("PROMO-ELFBAR-DUO","Elfbar Duo","Promos descartables",27000,None,[{"qty":1,"total":27000},{"qty":2,"total":45000}]),
]

def seed(db: Session):
    if db.query(LiquidLine).count() == 0:
        for slug, data in LIQUIDS.items():
            line = LiquidLine(slug=slug, name=data["name"], nicotine_options=data["nico"])
            db.add(line); db.flush()
            for flavor in data["flavors"]:
                db.add(LiquidFlavor(line_id=line.id, name=flavor))
            for size, cost, sale in data["prices"]:
                db.add(LiquidPrice(line_id=line.id, size_ml=size, cost=cost, sale=sale))
    if db.query(Product).count() == 0:
        for idx, (sku, name, category, price, image_url, tiers) in enumerate(PRODUCTS):
            db.add(Product(sku=sku, name=name, category=category, cost=price, sale=price, image_url=image_url, price_tiers=tiers, sort_order=idx))
    db.commit()
