from fastapi import FastAPI
from contextlib import asynccontextmanager
from fastapi.security import OAuth2PasswordBearer
from server.db import init_db
from server.routes.auth import router as auth_router 
from fastapi.middleware.cors import CORSMiddleware

@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    print("Database initiliaized on server startup")
    yield 
    print("server shutdown..")

app = FastAPI(lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # <-- React dev server port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(auth_router)

@app.get("/")
async def root():
    return {"message" : "Welcome to Password Generator"}

