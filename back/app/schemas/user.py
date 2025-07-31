from pydantic import BaseModel

class UserCreate(BaseModel):
    username: str
    password: str
    role: str = "public"

class Token(BaseModel):
    access_token: str
    token_type: str

from pydantic import BaseModel
from typing import Optional

class UserResponse(BaseModel):
    id: int
    username: str
    role: str
    
    class Config:
        orm_mode = True  # Pour SQLAlchemy 2.0+ (remplace orm_mode = True)