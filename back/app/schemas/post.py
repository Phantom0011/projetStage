from pydantic import BaseModel
from typing import List, Optional
from datetime import date

class PostBase(BaseModel):
    title: str
    content: str
    excerpt: Optional[str] = None
    category: Optional[str] = None
    author: str
    date: Optional[date] = None
    readTime: Optional[str] = None
    image: Optional[str] = None
    featured: bool = False
    tags: List[str] = []
    type: str  # news, event, blog

class PostCreate(PostBase):
    pass

class PostUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    excerpt: Optional[str] = None
    category: Optional[str] = None
    author: Optional[str] = None
    date: Optional[date] = None
    readTime: Optional[str] = None
    image: Optional[str] = None
    featured: Optional[bool] = None
    tags: Optional[List[str]] = None
    type: Optional[str] = None

class PostOut(PostBase):
    id: int

    class Config:
        orm_mode = True
