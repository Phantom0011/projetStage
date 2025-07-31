from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from sqlalchemy.orm import Session
from typing import Optional
from app.schemas.user import UserCreate, UserResponse, Token
from app.crud.user import get_user_by_username, create_user, authenticate_user
from app.auth.jwt_handler import create_access_token, decode_token, JWTError
from app.database import SessionLocal
import logging

logger = logging.getLogger(__name__)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/token")
router = APIRouter(tags=["authentication"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    """
    Dependency to get current authenticated user from token
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid authentication credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    try:
        payload = decode_token(token)
        username: Optional[str] = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    user = get_user_by_username(db, username)
    if user is None:
        raise credentials_exception
    
    return user

@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register(user: UserCreate, db: Session = Depends(get_db)):
    """
    Register a new user account
    """
    # Check if user already exists
    existing_user = get_user_by_username(db, user.username)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="Username already registered"
        )
    
    try:
        created_user = create_user(db, user.username, user.password, user.role)
        logger.info(f"New user registered: {user.username}")
        return {
            "message": "User registered successfully",
            "username": created_user.username
        }
    except Exception as e:
        logger.error(f"Error creating user {user.username}: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create user account"
        )

@router.post("/auth/token", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    """
    Authenticate user and return access token
    """
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        logger.warning(f"Failed login attempt for username: {form_data.username}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = create_access_token(
        data={"sub": user.username, "role": user.role}
    )
    
    logger.info(f"User logged in: {user.username}")
    return {
        "access_token": access_token,
        "token_type": "bearer"
    }

@router.get("/me", response_model=UserResponse)
async def read_users_me(current_user = Depends(get_current_user)):
    """
    Get current user information
    """
    return UserResponse.from_orm(current_user)

@router.post("/refresh", response_model=Token)
async def refresh_token(current_user = Depends(get_current_user)):
    """
    Refresh access token for authenticated user
    """
    access_token = create_access_token(
        data={"sub": current_user.username, "role": current_user.role}
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer"
    }

@router.post("/logout")
async def logout(current_user = Depends(get_current_user)):
    """
    Logout user (client should discard token)
    """
    logger.info(f"User logged out: {current_user.username}")
    return {"message": "Successfully logged out"}

# Dependency for role-based access control
def require_role(required_role: str):
    def role_checker(current_user = Depends(get_current_user)):
        if current_user.role != required_role:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Insufficient permissions"
            )
        return current_user
    return role_checker

# Example usage of role-based dependency
@router.get("/admin-only")
async def admin_endpoint(current_user = Depends(require_role("admin"))):
    """
    Example endpoint that requires admin role
    """
    return {"message": f"Hello admin {current_user.username}!"}