from pydantic import BaseModel

class SellerBase(BaseModel):
    name: str
    email: str
    store_name: str

class SellerCreate(SellerBase):
    password: str

class SellerResponse(SellerBase):
    id: int

    class Config:
        orm_mode = True

class SellerLogin(BaseModel):
    email: str
    password: str
