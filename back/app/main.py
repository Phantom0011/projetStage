from fastapi import FastAPI
from app.routes import auth_routes
from app.database import Base, engine
from app.routes import post
from app.routes import contact
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # URL de votre front Next.js
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_routes.router)
app.include_router(post.router)
app.include_router(contact.router)