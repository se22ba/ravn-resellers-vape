from datetime import datetime, timedelta, timezone
import secrets
import jwt
from fastapi import HTTPException, Header
from .config import get_settings

settings = get_settings()

def _assert_admin_configured():
    if not settings.admin_password or len(settings.jwt_secret) < 32:
        raise HTTPException(status_code=503, detail="Administración no configurada")

def login(username: str, password: str) -> str:
    _assert_admin_configured()
    if not secrets.compare_digest(username, settings.admin_username) or not secrets.compare_digest(password, settings.admin_password):
        raise HTTPException(status_code=401, detail="Credenciales inválidas")
    now = datetime.now(timezone.utc)
    return jwt.encode({"sub":"admin","iat":now,"exp":now+timedelta(hours=12)}, settings.jwt_secret, algorithm="HS256")

def require_admin(authorization: str | None = Header(default=None)):
    _assert_admin_configured()
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="No autorizado")
    try:
        payload = jwt.decode(authorization[7:], settings.jwt_secret, algorithms=["HS256"])
        if payload.get("sub") != "admin":
            raise ValueError
    except Exception:
        raise HTTPException(status_code=401, detail="Sesión inválida")
