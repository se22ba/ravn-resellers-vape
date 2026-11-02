from datetime import datetime, timedelta, timezone
import re
import secrets
import jwt
from fastapi import HTTPException, Header, Depends
from sqlalchemy.orm import Session
from .config import get_settings
from .db import get_db
from .models import ClientAccess

settings = get_settings()

def normalize_username(value: str) -> str:
    return " ".join((value or "").strip().lower().split())

def normalize_phone(value: str) -> str:
    return re.sub(r"\D+", "", value or "")

def _assert_admin_configured():
    if not settings.admin_password or len(settings.jwt_secret) < 32:
        raise HTTPException(status_code=503, detail="Administración no configurada")

def login(username: str, password: str) -> str:
    _assert_admin_configured()
    primary = secrets.compare_digest(username, settings.admin_username) and secrets.compare_digest(password, settings.admin_password)
    secondary = bool(settings.admin2_username and settings.admin2_password) and secrets.compare_digest(username, settings.admin2_username) and secrets.compare_digest(password, settings.admin2_password)
    if not (primary or secondary):
        raise HTTPException(status_code=401, detail="Credenciales inválidas")
    now = datetime.now(timezone.utc)
    return jwt.encode({"sub":"admin","kind":"admin","username":username,"iat":now,"exp":now+timedelta(hours=12)}, settings.jwt_secret, algorithm="HS256")

def require_admin(authorization: str | None = Header(default=None)):
    _assert_admin_configured()
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="No autorizado")
    try:
        payload = jwt.decode(authorization[7:], settings.jwt_secret, algorithms=["HS256"])
        if payload.get("sub") != "admin" or payload.get("kind") != "admin":
            raise ValueError
    except Exception:
        raise HTTPException(status_code=401, detail="Sesión inválida")

def login_client(username: str, phone: str, db: Session) -> dict:
    normalized_user = normalize_username(username)
    normalized_phone = normalize_phone(phone)
    if len(normalized_phone) < 6:
        raise HTTPException(status_code=401, detail="Datos de acceso inválidos")
    client = db.query(ClientAccess).filter(
        ClientAccess.username == normalized_user,
        ClientAccess.phone == normalized_phone,
        ClientAccess.active == True
    ).first()
    if not client:
        raise HTTPException(status_code=401, detail="Datos de acceso inválidos")
    now = datetime.now(timezone.utc)
    token = jwt.encode({
        "sub": str(client.id),
        "kind": "client",
        "username": client.username,
        "iat": now,
        "exp": now + timedelta(days=30)
    }, settings.jwt_secret, algorithm="HS256")
    return {"token": token, "client": {"id": client.id, "username": client.username}}

def require_client(authorization: str | None = Header(default=None), db: Session = Depends(get_db)) -> dict:
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Acceso de cliente requerido")
    try:
        payload = jwt.decode(authorization[7:], settings.jwt_secret, algorithms=["HS256"])
        if payload.get("kind") != "client":
            raise ValueError
        client_id = int(payload.get("sub"))
    except Exception:
        raise HTTPException(status_code=401, detail="Sesión de cliente inválida")
    client = db.query(ClientAccess).filter(ClientAccess.id == client_id, ClientAccess.active == True).first()
    if not client:
        raise HTTPException(status_code=401, detail="Cliente no autorizado")
    return {"id": client.id, "username": client.username, "phone": client.phone}
