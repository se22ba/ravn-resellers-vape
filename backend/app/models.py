import uuid
from datetime import datetime
from sqlalchemy import String, Integer, Numeric, DateTime, ForeignKey, Text, Boolean, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .db import Base

class LiquidLine(Base):
    __tablename__ = "liquid_lines"
    id: Mapped[int] = mapped_column(primary_key=True)
    slug: Mapped[str] = mapped_column(String(40), unique=True, index=True)
    name: Mapped[str] = mapped_column(String(80))
    nicotine_options: Mapped[list] = mapped_column(JSON, default=list)
    active: Mapped[bool] = mapped_column(Boolean, default=True)
    flavors = relationship("LiquidFlavor", back_populates="line", cascade="all, delete-orphan")
    prices = relationship("LiquidPrice", back_populates="line", cascade="all, delete-orphan")

class LiquidFlavor(Base):
    __tablename__ = "liquid_flavors"
    id: Mapped[int] = mapped_column(primary_key=True)
    line_id: Mapped[int] = mapped_column(ForeignKey("liquid_lines.id", ondelete="CASCADE"), index=True)
    name: Mapped[str] = mapped_column(String(120))
    active: Mapped[bool] = mapped_column(Boolean, default=True)
    line = relationship("LiquidLine", back_populates="flavors")

class LiquidPrice(Base):
    __tablename__ = "liquid_prices"
    id: Mapped[int] = mapped_column(primary_key=True)
    line_id: Mapped[int] = mapped_column(ForeignKey("liquid_lines.id", ondelete="CASCADE"), index=True)
    size_ml: Mapped[int] = mapped_column(Integer)
    cost: Mapped[float] = mapped_column(Numeric(12, 2))
    sale: Mapped[float] = mapped_column(Numeric(12, 2))
    line = relationship("LiquidLine", back_populates="prices")

class Product(Base):
    __tablename__ = "products"
    id: Mapped[int] = mapped_column(primary_key=True)
    sku: Mapped[str] = mapped_column(String(60), unique=True, index=True)
    name: Mapped[str] = mapped_column(String(140))
    category: Mapped[str] = mapped_column(String(60), index=True)
    cost: Mapped[float] = mapped_column(Numeric(12, 2))
    sale: Mapped[float] = mapped_column(Numeric(12, 2))
    image_url: Mapped[str | None] = mapped_column(Text, nullable=True)
    price_tiers: Mapped[list | None] = mapped_column(JSON, nullable=True)
    active: Mapped[bool] = mapped_column(Boolean, default=True)
    sort_order: Mapped[int] = mapped_column(Integer, default=0)

class Order(Base):
    __tablename__ = "orders"
    id: Mapped[int] = mapped_column(primary_key=True)
    number: Mapped[str] = mapped_column(String(30), unique=True, index=True)
    public_token: Mapped[str] = mapped_column(String(64), unique=True, index=True, default=lambda: uuid.uuid4().hex)
    customer_name: Mapped[str] = mapped_column(String(120))
    status: Mapped[str] = mapped_column(String(40), default="received", index=True)
    shipping: Mapped[float] = mapped_column(Numeric(12, 2), default=0)
    payment_reported_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, index=True)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    items = relationship("OrderItem", back_populates="order", cascade="all, delete-orphan")
    events = relationship("OrderEvent", back_populates="order", cascade="all, delete-orphan", order_by="OrderEvent.created_at")

class OrderItem(Base):
    __tablename__ = "order_items"
    id: Mapped[int] = mapped_column(primary_key=True)
    order_id: Mapped[int] = mapped_column(ForeignKey("orders.id", ondelete="CASCADE"), index=True)
    kind: Mapped[str] = mapped_column(String(20))
    reference_id: Mapped[int | None] = mapped_column(Integer, nullable=True)
    snapshot_name: Mapped[str] = mapped_column(String(220))
    line_name: Mapped[str | None] = mapped_column(String(80), nullable=True)
    flavor: Mapped[str | None] = mapped_column(String(120), nullable=True)
    size_ml: Mapped[int | None] = mapped_column(Integer, nullable=True)
    nicotine_mg: Mapped[int | None] = mapped_column(Integer, nullable=True)
    quantity: Mapped[int] = mapped_column(Integer, default=1)
    unit_cost: Mapped[float] = mapped_column(Numeric(12, 2))
    unit_sale: Mapped[float] = mapped_column(Numeric(12, 2))
    line_total_cost: Mapped[float] = mapped_column(Numeric(12, 2))
    line_total_sale: Mapped[float] = mapped_column(Numeric(12, 2))
    order = relationship("Order", back_populates="items")

class OrderEvent(Base):
    __tablename__ = "order_events"
    id: Mapped[int] = mapped_column(primary_key=True)
    order_id: Mapped[int] = mapped_column(ForeignKey("orders.id", ondelete="CASCADE"), index=True)
    event_type: Mapped[str] = mapped_column(String(60))
    detail: Mapped[str] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    order = relationship("Order", back_populates="events")

class SupplierBatch(Base):
    __tablename__ = "supplier_batches"
    id: Mapped[int] = mapped_column(primary_key=True)
    number: Mapped[str] = mapped_column(String(30), unique=True, index=True)
    order_ids: Mapped[list] = mapped_column(JSON)
    extra_items: Mapped[list] = mapped_column(JSON, default=list)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)


class AdminUser(Base):
    __tablename__ = "admin_users"
    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(String(80), unique=True, index=True)
    password_hash: Mapped[str] = mapped_column(String(255))
    active: Mapped[bool] = mapped_column(Boolean, default=True, index=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class ClientAccess(Base):
    __tablename__ = "client_access"
    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(String(80), unique=True, index=True)
    phone: Mapped[str] = mapped_column(String(32), unique=True, index=True)
    email: Mapped[str | None] = mapped_column(String(254), nullable=True)
    active: Mapped[bool] = mapped_column(Boolean, default=True, index=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)


class OrderClientAccess(Base):
    __tablename__ = "order_client_access"
    id: Mapped[int] = mapped_column(primary_key=True)
    order_id: Mapped[int] = mapped_column(ForeignKey("orders.id", ondelete="CASCADE"), unique=True, index=True)
    client_id: Mapped[int] = mapped_column(ForeignKey("client_access.id", ondelete="CASCADE"), index=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
