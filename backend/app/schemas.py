from pydantic import BaseModel, Field

class OrderItemIn(BaseModel):
    kind: str
    reference_id: int | None = None
    line_slug: str | None = None
    flavor: str | None = None
    size_ml: int | None = None
    nicotine_mg: int | None = None
    variant_note: str | None = Field(default=None, max_length=160)
    quantity: int = Field(ge=1, le=99)

class OrderCreate(BaseModel):
    items: list[OrderItemIn] = Field(min_length=1)

class ClientLogin(BaseModel):
    username: str = Field(min_length=2, max_length=80)
    phone: str = Field(min_length=6, max_length=32)

class ClientCreate(BaseModel):
    username: str = Field(min_length=2, max_length=80)
    phone: str = Field(min_length=6, max_length=32)
    email: str | None = Field(default=None, max_length=254)

class ClientPatch(BaseModel):
    username: str | None = Field(default=None, min_length=2, max_length=80)
    phone: str | None = Field(default=None, min_length=6, max_length=32)
    email: str | None = Field(default=None, max_length=254)
    active: bool | None = None

class ClientEmailUpdate(BaseModel):
    email: str | None = Field(default=None, max_length=254)

class AdminLogin(BaseModel):
    username: str
    password: str


class AdminUserCreate(BaseModel):
    username: str = Field(min_length=2, max_length=80)
    password: str = Field(min_length=6, max_length=128)

class AdminUserPatch(BaseModel):
    username: str | None = Field(default=None, min_length=2, max_length=80)
    password: str | None = Field(default=None, min_length=6, max_length=128)
    active: bool | None = None

class OrderAdminPatch(BaseModel):
    status: str | None = None
    shipping: float | None = Field(default=None, ge=0)

class BatchCreate(BaseModel):
    order_ids: list[int] = Field(min_length=1)
    extra_items: list[dict] = []
