from sqlalchemy.orm import Session
from ..models import Order, OrderItem, CartItem, Product
from ..schemas.order import OrderResponse, OrderItemSchema
from fastapi import HTTPException

# Create a new order
def create_order(db: Session, user_id: int) -> OrderResponse:
    # Step 1: Create a new order with initial status 'Pending'
    new_order = Order(user_id=user_id, status="Pending")
    db.add(new_order)
    db.commit()
    db.refresh(new_order)

    # Step 2: Fetch all items in the user's cart
    cart_items = db.query(CartItem).filter(CartItem.user_id == user_id).all()

    if not cart_items:
        raise HTTPException(status_code=400, detail="Cart is empty. Cannot create an order.")

    # Step 3: Create order items from cart items
    order_items = []
    for item in cart_items:
        product = db.query(Product).filter(Product.id == item.product_id).first()
        
        if not product:
            continue
        
        order_item = OrderItem(
            order_id=new_order.id,
            product_id=product.id,
            product_name=product.name,
            quantity=item.quantity,
            price=product.price
        )
        db.add(order_item)
        order_items.append(order_item)

    db.commit()

    # Step 4: Update the order status to 'Success'
    new_order.status = "Success"
    db.commit()

    # Step 5: Clear the cart
    db.query(CartItem).filter(CartItem.user_id == user_id).delete()
    db.commit()

    # Step 6: Return the OrderResponse schema
    return OrderResponse(
        id=new_order.id,
        user_id=new_order.user_id,
        status=new_order.status,
        items=[
            OrderItemSchema(
                id=item.id,
                order_id=item.order_id,
                product_id=item.product_id,
                product_name=item.product_name,
                quantity=item.quantity,
                price=item.price
            ) for item in order_items
        ]
    )

# Get all orders for a user
def get_orders(db: Session, user_id: int) -> list[OrderResponse]:
    orders = db.query(Order).filter(Order.user_id == user_id).all()
    order_responses = []
    for order in orders:
        order_items = db.query(OrderItem).filter(OrderItem.order_id == order.id).all()
        order_responses.append(OrderResponse(
            id=order.id,
            user_id=order.user_id,
            status=order.status,
            items=[
                OrderItemSchema(
                    id=item.id,
                    order_id=item.order_id,
                    product_id=item.product_id,
                    product_name=item.product_name,
                    quantity=item.quantity,
                    price=item.price
                ) for item in order_items
            ]
        ))
    return order_responses

# Get order details by order ID
def get_order_details(db: Session, order_id: int, user_id: int) -> OrderResponse:
    order = db.query(Order).filter(Order.id == order_id, Order.user_id == user_id).first()
    
    if not order:
        raise HTTPException(status_code=404, detail="Order not found.")
    
    order_items = db.query(OrderItem).filter(OrderItem.order_id == order.id).all()

    return OrderResponse(
        id=order.id,
        user_id=order.user_id,
        status=order.status,
        items=[
            OrderItemSchema(
                id=item.id,
                order_id=item.order_id,
                product_id=item.product_id,
                product_name=item.product_name,
                quantity=item.quantity,
                price=item.price
            ) for item in order_items
        ]
    )
