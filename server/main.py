from fastapi import FastAPI
from contextlib import asynccontextmanager
from server.db import init_db


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    print("Database initiliaized on server startup")
    yield 
    print("server shutdown..")

app = FastAPI(lifespan=lifespan)
@app.get("/")
async def root():
    return {"message" : "Welcome to Password Generator"}