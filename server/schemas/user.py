from pydantic import BaseModel

class UserBase(BaseModel):
    name: str
    email: str
    gender: str
    contact_number: str
    address: str

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int

    class Config:
        orm_mode = True

class UserLogin(BaseModel):
    email: str
    password: str
