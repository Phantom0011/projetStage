import os
from pathlib import Path
from dotenv import load_dotenv

# Résout le chemin vers le fichier .env à la racine du dossier 'env'
env_path = Path(__file__).resolve().parent / ".env"
load_dotenv(dotenv_path=env_path)

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
