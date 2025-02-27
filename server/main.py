from fastapi import FastAPI
from .routers import users, sellers, products, cart , order
from fastapi.middleware.cors import CORSMiddleware
from .database import Base , engine

# Create the database tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (POST, GET, etc.)
    allow_headers=["*"],  # Allow all headers
)

app.include_router(users.router)
app.include_router(sellers.router)
app.include_router(products.router)
app.include_router(cart.router)
app.include_router(order.router)
