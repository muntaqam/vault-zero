from fastapi import FastAPI
from contextlib import asynccontextmanager
from fastapi.security import OAuth2PasswordBearer
from server.db import init_db
from server.routes.auth import router as auth_router 

@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    print("Database initiliaized on server startup")
    yield 
    print("server shutdown..")

app = FastAPI(lifespan=lifespan)
app.include_router(auth_router)

@app.get("/")
async def root():
    return {"message" : "Welcome to Password Generator"}

