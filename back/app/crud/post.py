from sqlalchemy.orm import Session
from app.models.post import Post
from app.schemas.post import PostCreate, PostUpdate

def create_post(db: Session, post: PostCreate):
    db_post = Post(**post.dict())
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post

def get_posts(db: Session, type_filter: str = None):
    if type_filter:
        return db.query(Post).filter(Post.type == type_filter).all()
    return db.query(Post).all()

def get_post_by_id(db: Session, post_id: int):
    return db.query(Post).filter(Post.id == post_id).first()

def update_post(db: Session, post_id: int, post_data: PostUpdate):
    post = get_post_by_id(db, post_id)
    if post:
        for key, value in post_data.dict().items():
            setattr(post, key, value)
        db.commit()
        db.refresh(post)
    return post

def delete_post(db: Session, post_id: int):
    post = get_post_by_id(db, post_id)
    if post:
        db.delete(post)
        db.commit()
    return post
