from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base

# User Model
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), index=True)
    email = Column(String(255), unique=True, index=True)
    password = Column(String(255))
    gender = Column(String(255))
    contact_number = Column(String(255))
    address = Column(String(255))

# Seller Model
class Seller(Base):
    __tablename__ = "sellers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), index=True)
    email = Column(String(255), unique=True, index=True)
    password = Column(String(255))
    store_name = Column(String(255))

# Product Model (Added by Seller)
class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), index=True)
    description = Column(String(255))
    price = Column(Float)
    category = Column(String(255))
    image_url = Column(String(255))
    stock = Column(Integer)
    seller_id = Column(Integer, ForeignKey("sellers.id"))

    seller = relationship("Seller", backref="products")

# Cart Model (For User)
class CartItem(Base):
    __tablename__ = "cart_items"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    product_id = Column(Integer, ForeignKey("products.id"))
    product_name = Column(String(255), nullable=False) 
    quantity = Column(Integer)

    user = relationship("User", backref="cart_items")
    product = relationship("Product" , backref="cart_items")


# Order Model
class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    status = Column(String(255), default="Pending")

    user = relationship("User", backref="orders")
    items = relationship("OrderItem", back_populates="order")

# Order Item Model
class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"))
    product_id = Column(Integer, ForeignKey("products.id"))
    product_name = Column(String(255), nullable=False) 
    quantity = Column(Integer)
    price = Column(Float)

    order = relationship("Order", back_populates="items")
    product = relationship("Product")