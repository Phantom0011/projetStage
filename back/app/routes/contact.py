from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.dependencies import get_db
from app.schemas.contact import ContactCreate, ContactResponse
from app.crud.contact import create_contact

router = APIRouter(prefix="/contact", tags=["Contact"])

@router.post("/", response_model=ContactResponse)
def send_contact(contact: ContactCreate, db: Session = Depends(get_db)):
    obj = create_contact(db, contact)
    return obj
