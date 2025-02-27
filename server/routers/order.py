from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from ..schemas.order import OrderCreate, OrderResponse
from ..crud import crud_order
from ..database import get_db

router = APIRouter(prefix="/orders", tags=["Orders"])

# Create a new order
@router.post("/{user_id}", response_model=OrderResponse)
def create_order(user_id: int, db: Session = Depends(get_db)):
    return crud_order.create_order(db, user_id)

# Get all orders for a user
@router.get("/{user_id}", response_model=List[OrderResponse])
def get_orders(user_id: int, db: Session = Depends(get_db)):
    return crud_order.get_orders(db, user_id)

# Get order details by order ID
@router.get("/{user_id}/{order_id}", response_model=OrderResponse)
def get_order_details(user_id: int, order_id: int, db: Session = Depends(get_db)):
    return crud_order.get_order_details(db, order_id, user_id)
