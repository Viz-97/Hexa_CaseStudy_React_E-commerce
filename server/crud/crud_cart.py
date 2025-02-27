from sqlalchemy.orm import Session, joinedload
from ..models import CartItem, Product
from ..schemas.cart import CartItemCreate, CartItemResponse

# Add product to cart
def add_to_cart(db: Session, cart_item: CartItemCreate, user_id: int) -> CartItemResponse:
    # Check if the product exists in the database
    product = db.query(Product).filter(Product.id == cart_item.product_id).first()
    
    if not product:
        raise ValueError("Product not found")
    
    # Check if the product is already in the user's cart
    existing_cart_item = db.query(CartItem).filter(
        CartItem.user_id == user_id,
        CartItem.product_id == cart_item.product_id
    ).first()
    
    if existing_cart_item:
        # Update the quantity if product already exists in the cart
        existing_cart_item.quantity += cart_item.quantity
        db.commit()
        db.refresh(existing_cart_item)
        return existing_cart_item
    
    # Create a new cart item
    db_cart_item = CartItem(
        user_id=user_id,
        product_id=cart_item.product_id,
        product_name=product.name,
        quantity=cart_item.quantity
    )
    
    db.add(db_cart_item)
    db.commit()
    db.refresh(db_cart_item)
    return db_cart_item

# Get all items in the cart for a user
def get_cart_items(db: Session, user_id: int) -> list[CartItemResponse]:
    return (
        db.query(CartItem)
        .filter(CartItem.user_id == user_id)
        .options(joinedload(CartItem.product))
        .all()
    )

# Update cart item quantity
def update_cart_item(db: Session, item_id: int, quantity: int, user_id: int) -> CartItemResponse:
    cart_item = db.query(CartItem).filter(
        CartItem.id == item_id, 
        CartItem.user_id == user_id
    ).first()
    
    if cart_item:
        cart_item.quantity = quantity
        db.commit()
        db.refresh(cart_item)
    return cart_item

# Remove item from cart
def remove_cart_item(db: Session, item_id: int, user_id: int) -> CartItemResponse:
    cart_item = db.query(CartItem).filter(
        CartItem.id == item_id, 
        CartItem.user_id == user_id
    ).first()
    
    if cart_item:
        db.delete(cart_item)
        db.commit()
    return cart_item
