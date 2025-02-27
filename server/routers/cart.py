from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..schemas.cart import CartItemCreate, CartItemResponse
from ..crud import crud_cart
from ..database import get_db

router = APIRouter(prefix="/cart", tags=["Cart"])

# Add item to cart
@router.post("/{user_id}", response_model=CartItemResponse)
def add_to_cart(user_id: int, cart_item: CartItemCreate, db: Session = Depends(get_db)):
    return crud_cart.add_to_cart(db, cart_item, user_id)

# Get all cart items for a user
@router.get("/{user_id}", response_model=List[CartItemResponse])
def get_cart_items(user_id: int, db: Session = Depends(get_db)):
    return crud_cart.get_cart_items(db, user_id)

# Update cart item quantity
@router.put("/{user_id}/{item_id}", response_model=CartItemResponse)
def update_cart_item(user_id: int, item_id: int, quantity: int, db: Session = Depends(get_db)):
    cart_item = crud_cart.update_cart_item(db, item_id, quantity, user_id)
    if not cart_item:
        raise HTTPException(status_code=404, detail="Cart item not found")
    return cart_item

# Remove item from cart
@router.delete("/{user_id}/{item_id}")
def remove_cart_item(user_id: int, item_id: int, db: Session = Depends(get_db)):
    cart_item = crud_cart.remove_cart_item(db, item_id, user_id)
    if not cart_item:
        raise HTTPException(status_code=404, detail="Cart item not found")
    return {"message": "Item removed from cart"}
