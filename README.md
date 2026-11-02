# Valhalla Vape — RAVN Resellers Vape V1

MVP mobile-first para pedidos de e-liquids e insumos de vapeo, administración de pedidos, seguimiento de pagos y consolidación de compras para Anubis.

## Arquitectura

- **Frontend público/admin:** HTML + CSS + JavaScript estático en la raíz, compatible con GitHub Pages sin build.
- **Backend:** FastAPI + SQLAlchemy, preparado para Render.
- **Base de datos:** PostgreSQL externo mediante `DATABASE_URL`. SQLite queda solo como fallback de desarrollo.
- **Admin:** acceso protegido con JWT y clave definida por variable de entorno.
- **Branding:** logo Valhalla Vape embebido; estética nórdica oscura y mobile-first; 11 px mínimo absoluto.

## Funciones V1

- Catálogo Anubis de Tradicional, Premium, Clon, S.A.L.T.S. y Galaxy.
- Selección de línea, sabor, ml y mg.
- Equipos, resistencias, accesorios, descartables y promociones.
- Insumos/promos sin margen: costo = venta.
- Carrito y pedido identificado solo por nombre del cliente.
- Envío cargado desde administración.
- Transferencia habilitada recién en estado **Esperando pago**.
- Botón **Ya transferí** para el cliente.
- Estados e historial completo del pedido.
- Dashboard admin con costo, venta y ganancia.
- Consolidación de varios pedidos en un listado simple para Anubis.
- Snapshot histórico de costos y ventas por cada línea de pedido.

## Backend local

```bash
cd backend
python -m venv .venv
# Windows: .venv\Scripts\activate
# Linux/macOS: source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload
```

API: `http://localhost:8000/api` · Swagger: `http://localhost:8000/docs`

## Variables de producción

```env
DATABASE_URL=postgresql+psycopg://...
ADMIN_PASSWORD=...
JWT_SECRET=...
CORS_ORIGINS=https://se22ba.github.io
PAYMENT_ALIAS=...
PAYMENT_HOLDER=...
PAYMENT_CVU=
```

## GitHub Pages

La tienda está en la raíz del repositorio. Configurar Pages para publicar desde `main / (root)`.

El frontend apunta por defecto a:

`https://valhalla-vape-api.onrender.com/api`

Si el servicio de Render usa otro hostname, cambiar la constante `API` en `app.js`.

## Decisiones y pendientes

Ver `docs/DECISIONES_V1.md`.

**Pendiente funcional menor:** los mg de Tradicional/Premium/Clon/Galaxy están provisionalmente en 0/3/6 mg porque la fuente recibida no detalla todas las concentraciones. S.A.L.T.S. queda en 25 mg según el catálogo.
