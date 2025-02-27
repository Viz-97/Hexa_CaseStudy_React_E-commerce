from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..schemas.user import UserCreate, UserResponse, UserLogin
from ..crud import crud_user
from ..database import get_db

router = APIRouter(prefix="/users", tags=["Users"])

# User Registration
@router.post("/register", response_model=UserResponse)
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = crud_user.get_user_by_email(db, user.email)
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered.")
    return crud_user.create_user(db, user)

# User Login
@router.post("/login")
def login_user(user: UserLogin, db: Session = Depends(get_db)):
    db_user = crud_user.get_user_by_email(db, user.email)
    if not db_user or db_user.password != user.password:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    
    # Corrected response format for user login
    return {"message": "Login successful", "userId": db_user.id}

