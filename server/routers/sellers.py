from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..schemas.seller import SellerCreate, SellerResponse, SellerLogin
from ..crud import crud_seller
from ..database import get_db

router = APIRouter(prefix="/sellers", tags=["Sellers"])

# Seller Registration
@router.post("/register", response_model=SellerResponse)
def register_seller(seller: SellerCreate, db: Session = Depends(get_db)):
    existing_seller = crud_seller.get_seller_by_email(db, seller.email)
    if existing_seller:
        raise HTTPException(status_code=400, detail="Email already registered.")
    return crud_seller.create_seller(db, seller)

# Seller Login
@router.post("/login")
def login_seller(seller: SellerLogin, db: Session = Depends(get_db)):
    db_seller = crud_seller.get_seller_by_email(db, seller.email)
    if not db_seller or db_seller.password != seller.password:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    
    # Corrected response format for seller login
    return {"message": "Login successful", "sellerId": db_seller.id}
