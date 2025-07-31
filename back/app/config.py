import os
from dotenv import load_dotenv
from pathlib import Path

# Charger le fichier .env situé dans le même dossier que config.py
env_path = Path(__file__).parent / ".env"
load_dotenv(dotenv_path=env_path)

# Configuration principale
DATABASE_URL = os.getenv("DATABASE_URL")
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 60))

EMAIL_SENDER = os.getenv("EMAIL_SENDER")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD")