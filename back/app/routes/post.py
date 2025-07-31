from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.dependencies import get_db, get_current_user
from app.schemas.post import PostCreate, PostOut, PostUpdate
import app.crud.post as post_crud

router = APIRouter(prefix="/posts", tags=["Posts"])

@router.post("/", response_model=PostOut)
def create_post(post: PostCreate, db: Session = Depends(get_db), user=Depends(get_current_user)):
    if user.role != "admin":
        raise HTTPException(status_code=403, detail="Only admin can create posts")
    return post_crud.create_post(db, post)

@router.get("/", response_model=list[PostOut])
def list_posts(type: str = None, db: Session = Depends(get_db)):
    return post_crud.get_posts(db, type)

@router.get("/{post_id}", response_model=PostOut)
def get_post(post_id: int, db: Session = Depends(get_db)):
    post = post_crud.get_post_by_id(db, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post

@router.put("/{post_id}", response_model=PostOut)
def update_post(post_id: int, post_data: PostUpdate, db: Session = Depends(get_db), user=Depends(get_current_user)):
    if user.role != "admin":
        raise HTTPException(status_code=403, detail="Only admin can update posts")
    return post_crud.update_post(db, post_id, post_data)

@router.delete("/{post_id}")
def delete_post(post_id: int, db: Session = Depends(get_db), user=Depends(get_current_user)):
    if user.role != "admin":
        raise HTTPException(status_code=403, detail="Only admin can delete posts")
    return post_crud.delete_post(db, post_id)
