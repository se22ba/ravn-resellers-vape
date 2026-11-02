# Valhalla Vape — RAVN Resellers Vape V1

MVP mobile-first para toma de pedidos de e-liquids e insumos de vapeo, administración de pedidos, seguimiento de pagos y consolidación de compras para Anubis.

## Stack

- Frontend: React + TypeScript + Vite, preparado para GitHub Pages.
- Backend: FastAPI + SQLAlchemy, preparado para Render.
- Base: PostgreSQL externa mediante `DATABASE_URL` (SQLite solo para desarrollo local).
- Admin: JWT con clave definida por variable de entorno.

## Desarrollo local

### Backend

```bash
cd backend
python -m venv .venv
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload
```

API: `http://localhost:8000/api` · Swagger: `http://localhost:8000/docs`

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Web: `http://localhost:5173`

## Producción

### Render / API

Usar `backend/render.yaml` o crear un Web Service con root `backend`.
Variables: `DATABASE_URL`, `ADMIN_PASSWORD`, `JWT_SECRET`, `CORS_ORIGINS`, `PAYMENT_ALIAS`, `PAYMENT_HOLDER`. `PAYMENT_CVU` es opcional.

### GitHub Pages / frontend

Configurar `VITE_API_URL` con la URL pública del backend antes de compilar. El frontend usa HashRouter.

## Reglas V1

- Anubis es proveedor; Valhalla Vape es la identidad comercial.
- Cliente: solo nombre.
- E-liquids: línea + sabor + ml + mg.
- Insumos/promos: costo = venta, sin margen.
- Envío se carga desde administración.
- Datos de transferencia solo desde “Esperando pago”.
- Historial completo por pedido.
- Consolidación simple para Anubis.
- Mobile-first, mínimo tipográfico absoluto 11 px.
