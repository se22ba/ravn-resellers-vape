# Deploy V1

## 1. GitHub Pages

En el repositorio: **Settings → Pages → Build and deployment → Deploy from a branch → main → /(root)**.

La tienda es estática y no requiere build. `.nojekyll` está incluido.

URL esperada:

`https://se22ba.github.io/ravn-resellers-vape/`

## 2. Render API

Crear Web Service desde este repositorio:

- Root Directory: `backend`
- Runtime: Python
- Build: `pip install -r requirements.txt`
- Start: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
- Health: `/api/health`

Variables:

- `DATABASE_URL`: PostgreSQL persistente.
- `ADMIN_PASSWORD`: clave privada del panel.
- `JWT_SECRET`: secreto largo y aleatorio.
- `CORS_ORIGINS`: `https://se22ba.github.io`
- `PAYMENT_ALIAS`: alias de transferencia.
- `PAYMENT_HOLDER`: titular.
- `PAYMENT_CVU`: opcional.

El frontend espera por defecto `https://valhalla-vape-api.onrender.com/api`. Si el servicio usa otro nombre, editar `API` en `app.js`.

## 3. Keep-alive

El health endpoint es `/api/health` y puede ser utilizado por el monitor/keep-alive ya previsto para evitar inactividad durante pruebas.

## Advertencia V1

No usar SQLite de Render como almacenamiento definitivo. El backend lo admite solo como fallback local. Los pedidos deben persistirse en PostgreSQL.
