from pydantic import BaseModel
from typing import Optional

# Product schema to include price in the response
class ProductResponse(BaseModel):
    id: int
    name: str
    price: float

    class Config:
        orm_mode = True

# CartItem schema to include the product details
class CartItemResponse(BaseModel):
    id: int
    product_id: int
    product_name: str
    quantity: int
    product: Optional[ProductResponse] = None  # Include product details

    class Config:
        orm_mode = True

# Request model for adding items to the cart
class CartItemCreate(BaseModel):
    product_id: int
    quantity: int
