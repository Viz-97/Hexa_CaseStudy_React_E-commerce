from sqlalchemy.orm import Session
from ..models import Product
from ..schemas.product import ProductCreate

def create_product(db: Session, product: ProductCreate, seller_id: int):
    db_product = Product(**product.dict(), seller_id=seller_id)
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

def get_products(db: Session):
    return db.query(Product).all()

def get_products_by_seller(db: Session, seller_id: int):
    return db.query(Product).filter(Product.seller_id == seller_id).all()
