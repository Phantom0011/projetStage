from sqlalchemy.orm import Session
from app.models.contact import ContactMessage
from app.schemas.contact import ContactCreate
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Gmail
EMAIL_USER = "ricardoanjaraniaina8@gmail.com"
EMAIL_PASSWORD = "ztvi vdcw kjno qfqy"  # à remplacer par mot de passe d'application Gmail

def create_contact(db: Session, contact_data: ContactCreate):
    contact = ContactMessage(**contact_data.dict())
    db.add(contact)
    db.commit()
    db.refresh(contact)  # <-- assure que tous les champs sont chargés
    send_email_notification(contact)
    return contact  # <-- retourne bien l'objet SQLAlchemy

def send_email_notification(contact: ContactMessage):
    subject = f"[{contact.category}] {contact.subject}"
    body = f"""
    Vous avez reçu un nouveau message via le formulaire Madatlas :

    Nom      : {contact.name}
    Email    : {contact.email}
    Catégorie: {contact.category}
    Sujet    : {contact.subject}

    Message :
    {contact.message}
    """

    msg = MIMEMultipart()
    msg["From"] = EMAIL_USER
    msg["To"] = EMAIL_USER
    msg["Subject"] = subject
    msg.attach(MIMEText(body, "plain"))

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(EMAIL_USER, EMAIL_PASSWORD)
        server.sendmail(EMAIL_USER, EMAIL_USER, msg.as_string())
