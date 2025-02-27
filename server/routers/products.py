from fastapi import APIRouter,HTTPException, Depends
from sqlalchemy.orm import Session
from ..schemas.product import ProductCreate, ProductResponse
from ..crud import crud_product
from ..database import get_db
from typing import List

router = APIRouter(prefix="/products", tags=["Products"])

@router.post("/{seller_id}", response_model=ProductResponse)
def create_product(seller_id: int, product: ProductCreate, db: Session = Depends(get_db)):
    return crud_product.create_product(db, product, seller_id)


@router.get("/seller/{seller_id}", response_model=list[ProductResponse])
def get_products_by_seller(seller_id: int, db: Session = Depends(get_db)):
    products = crud_product.get_products_by_seller(db, seller_id)
    if not products:
        raise HTTPException(status_code=404, detail="No products found for this seller")
    return products
@router.get("/", response_model=List[ProductResponse])
def get_all_products(db: Session = Depends(get_db)):
    return crud_product.get_products(db)


