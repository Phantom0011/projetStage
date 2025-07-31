from pydantic import BaseModel

class PostBase(BaseModel):
    title: str
    content: str
    type: str  # news, event, blog
    author: str

class PostCreate(PostBase):
    pass

class PostUpdate(PostBase):
    pass

class PostOut(PostBase):
    id: int

    class Config:
        orm_mode = True
