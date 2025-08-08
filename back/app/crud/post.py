from sqlalchemy.orm import Session
from app.models.post import Post
from app.schemas.post import PostCreate, PostUpdate
from typing import List, Optional

def create_post(db: Session, post: PostCreate) -> Post:
    if post.type not in ["news", "event", "blog"]:
        raise ValueError("Type must be one of: news, event, blog")
    db_post = Post(**post.dict())
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post

def get_posts(db: Session, type_filter: str = None) -> List[Post]:
    if type_filter:
        return db.query(Post).filter(Post.type == type_filter).all()
    return db.query(Post).all()

def get_post_by_id(db: Session, post_id: int) -> Optional[Post]:
    return db.query(Post).filter(Post.id == post_id).first()

def update_post(db: Session, post_id: int, post_data: PostUpdate) -> Optional[Post]:
    db_post = db.query(Post).filter(Post.id == post_id).first()
    if not db_post:
        return None
    update_data = post_data.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_post, key, value)
    db.commit()
    db.refresh(db_post)
    return db_post

def delete_post(db: Session, post_id: int) -> bool:
    db_post = db.query(Post).filter(Post.id == post_id).first()
    if not db_post:
        return False
    db.delete(db_post)
    db.commit()
    return True