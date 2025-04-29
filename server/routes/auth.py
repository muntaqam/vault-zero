from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select

from server.db import get_session
from server.models.user import User
from server.schemas import UserCreate
from server.auth.hash_utils import hash_password

router = APIRouter()

@router.post("/register")
async def register(user: UserCreate, session: Session = Depends(get_session)):
    existing_user = session.exec(select(User).where(User.email == user.email)).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered!")
    hashed_pw = hash_password(user.password)
    new_user = User(email=user.email, hashed_password=hashed_pw)
    session.add(new_user)
    session.commit()
    session.refresh(new_user)
    return {"message": "User registered successfully"}
