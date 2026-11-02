from datetime import datetime, timedelta, timezone
import secrets
import jwt
from fastapi import HTTPException, Header
from .config import get_settings

settings = get_settings()

def login(password: str) -> str:
    if not secrets.compare_digest(password, settings.admin_password):
        raise HTTPException(status_code=401, detail="Credenciales inválidas")
    now = datetime.now(timezone.utc)
    return jwt.encode({"sub": "admin", "iat": now, "exp": now + timedelta(hours=12)}, settings.jwt_secret, algorithm="HS256")

def require_admin(authorization: str | None = Header(default=None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="No autorizado")
    try:
        payload = jwt.decode(authorization[7:], settings.jwt_secret, algorithms=["HS256"])
        if payload.get("sub") != "admin":
            raise ValueError
    except Exception:
        raise HTTPException(status_code=401, detail="Sesión inválida")
