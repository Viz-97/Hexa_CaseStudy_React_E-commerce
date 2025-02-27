from typing import List
from pydantic import BaseModel

# Order Item Schema
class OrderItemSchema(BaseModel):
    id: int
    order_id: int
    product_id: int
    product_name: str
    quantity: int
    price: float

    class Config:
        orm_mode = True

# Order Create Schema (for creating a new order)
class OrderCreate(BaseModel):
    user_id: int

# Order Response Schema
class OrderResponse(BaseModel):
    id: int
    user_id: int
    status: str
    items: List[OrderItemSchema]

    class Config:
        orm_mode = True
