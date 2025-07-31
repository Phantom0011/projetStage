from sqlalchemy.orm import Session
from app.models.user import User
from app.auth.jwt_handler import get_password_hash, verify_password

def get_user_by_username(db: Session, username: str):
    return db.query(User).filter(User.username == username).first()

def create_user(db: Session, username: str, password: str, role: str):
    hashed_pw = get_password_hash(password)
    new_user = User(username=username, hashed_password=hashed_pw, role=role)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

def authenticate_user(db: Session, username: str, password: str):
    user = get_user_by_username(db, username)
    if user and verify_password(password, user.hashed_password):
        return user
    return None
