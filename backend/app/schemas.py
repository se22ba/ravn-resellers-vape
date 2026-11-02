from pydantic import BaseModel, Field

class OrderItemIn(BaseModel):
    kind: str
    reference_id: int | None = None
    line_slug: str | None = None
    flavor: str | None = None
    size_ml: int | None = None
    nicotine_mg: int | None = None
    quantity: int = Field(ge=1, le=99)

class OrderCreate(BaseModel):
    customer_name: str = Field(min_length=2, max_length=120)
    items: list[OrderItemIn] = Field(min_length=1)

class AdminLogin(BaseModel):
    password: str

class OrderAdminPatch(BaseModel):
    status: str | None = None
    shipping: float | None = Field(default=None, ge=0)

class BatchCreate(BaseModel):
    order_ids: list[int] = Field(min_length=1)
    extra_items: list[dict] = []
