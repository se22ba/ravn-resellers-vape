from sqlalchemy import create_engine, MetaData
from sqlalchemy.orm import DeclarativeBase, sessionmaker
from .config import get_settings

settings = get_settings()

database_url = settings.database_url.strip()
if database_url.startswith("postgres://"):
    database_url = "postgresql+psycopg://" + database_url[len("postgres://"):]
elif database_url.startswith("postgresql://"):
    database_url = "postgresql+psycopg://" + database_url[len("postgresql://"):]

is_sqlite = database_url.startswith("sqlite")
is_postgres = database_url.startswith("postgresql+psycopg://")
connect_args = {"check_same_thread": False} if is_sqlite else {}
engine = create_engine(database_url, pool_pre_ping=True, connect_args=connect_args)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)

class Base(DeclarativeBase):
    metadata = MetaData(schema=settings.db_schema if is_postgres else None)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
