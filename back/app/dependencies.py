# dependencies.py

from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer
import jwt

from app.database import SessionLocal
from app.models.user import User  # ou juste from models import User selon ton structure
from app.config import SECRET_KEY, ALGORITHM  # Si tu as externalisé les configs

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/token")

# ⏬ Fonction pour obtenir la session DB
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ⏬ Fonction pour obtenir l'utilisateur courant
def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid token")

        user = db.query(User).filter(User.username == username).first()
        if user is None:
            raise HTTPException(status_code=401, detail="User not found")

        return user
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
