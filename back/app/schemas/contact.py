from pydantic import BaseModel, EmailStr
from datetime import datetime

class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    category: str
    subject: str
    message: str

class ContactResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    category: str
    subject: str
    message: str
    created_at: datetime

    class Config:
        orm_mode = True
