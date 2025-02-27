from sqlalchemy.orm import Session
from ..models import Seller
from ..schemas.seller import SellerCreate

def create_seller(db: Session, seller: SellerCreate):
    db_seller = Seller(**seller.dict())
    db.add(db_seller)
    db.commit()
    db.refresh(db_seller)
    return db_seller

def get_seller_by_email(db: Session, email: str):
    return db.query(Seller).filter(Seller.email == email).first()
