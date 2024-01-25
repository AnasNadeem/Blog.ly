from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routers import post

from .database import engine, Base
Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS middleware
origins = [
    "http://localhost:3000",
    "http://localhost:8000",
    "http://localhost:8080",
    "https://easemylink.com",
    "http://easemylink.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)


# Routers - Endpoints
app.include_router(post.router)
