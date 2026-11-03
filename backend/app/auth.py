from datetime import datetime, timedelta, timezone
import hashlib
import re
import secrets
import jwt
from fastapi import HTTPException, Header, Depends
from sqlalchemy.orm import Session
from .config import get_settings
from .db import get_db
from .models import ClientAccess, AdminUser

settings = get_settings()
PBKDF2_ITERATIONS = 240_000

def normalize_username(value: str) -> str:
    return " ".join((value or "").strip().lower().split())

def normalize_phone(value: str) -> str:
    return re.sub(r"\D+", "", value or "")

def hash_password(password: str) -> str:
    salt = secrets.token_bytes(16)
    digest = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt, PBKDF2_ITERATIONS)
    return f"pbkdf2_sha256${PBKDF2_ITERATIONS}${salt.hex()}${digest.hex()}"

def verify_password(password: str, encoded: str) -> bool:
    try:
        algorithm, iterations, salt_hex, digest_hex = encoded.split("$", 3)
        if algorithm != "pbkdf2_sha256":
            return False
        digest = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), bytes.fromhex(salt_hex), int(iterations))
        return secrets.compare_digest(digest.hex(), digest_hex)
    except Exception:
        return False

def seed_admins(db: Session):
    pairs = [
        (settings.admin_username, settings.admin_password),
        (settings.admin2_username, settings.admin2_password),
    ]
    changed = False
    for username, password in pairs:
        username = normalize_username(username)
        if not username or not password:
            continue
        existing = db.query(AdminUser).filter(AdminUser.username == username).first()
        if not existing:
            db.add(AdminUser(username=username, password_hash=hash_password(password), active=True))
            changed = True
    if changed:
        db.commit()

def _assert_admin_configured(db: Session):
    if len(settings.jwt_secret) < 32:
        raise HTTPException(status_code=503, detail="Administración no configurada")
    if not db.query(AdminUser).filter(AdminUser.active == True).first():
        raise HTTPException(status_code=503, detail="No hay administradores activos")

def login(username: str, password: str, db: Session) -> str:
    _assert_admin_configured(db)
    normalized = normalize_username(username)
    admin = db.query(AdminUser).filter(AdminUser.username == normalized, AdminUser.active == True).first()
    if not admin or not verify_password(password, admin.password_hash):
        raise HTTPException(status_code=401, detail="Credenciales inválidas")
    now = datetime.now(timezone.utc)
    return jwt.encode({
        "sub": str(admin.id),
        "kind": "admin",
        "username": admin.username,
        "iat": now,
        "exp": now + timedelta(hours=12)
    }, settings.jwt_secret, algorithm="HS256")

def require_admin(authorization: str | None = Header(default=None), db: Session = Depends(get_db)) -> dict:
    _assert_admin_configured(db)
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="No autorizado")
    try:
        payload = jwt.decode(authorization[7:], settings.jwt_secret, algorithms=["HS256"])
        if payload.get("kind") != "admin":
            raise ValueError
        admin_id = int(payload.get("sub"))
    except Exception:
        raise HTTPException(status_code=401, detail="Sesión inválida")
    admin = db.query(AdminUser).filter(AdminUser.id == admin_id, AdminUser.active == True).first()
    if not admin:
        raise HTTPException(status_code=401, detail="Administrador no autorizado")
    return {"id": admin.id, "username": admin.username}

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
    return {"token": token, "client": {"id": client.id, "username": client.username, "email": client.email}}

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
    return {"id": client.id, "username": client.username, "phone": client.phone, "email": client.email}
