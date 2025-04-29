from fastapi import APIRouter, Depends, HTTPException
from server.auth.dependencies import get_current_user
from sqlmodel import Session, select
from server.db import get_session
from server.models.user import User
from server.schemas import UserCreate, UserLogin
from server.auth.hash_utils import hash_password, verify_password
from server.auth.jwt_handler import create_access_token

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


@router.post("/login")
async def login(login_data: UserLogin, session = Depends(get_session)):
    user = session.exec(select(User).where(User.email == login_data.login_email)).first()
    if not user:
        raise HTTPException(status_code = 400, detail = "Invalid credentials")
    if not verify_password(login_data.password,user.hashed_password):
        raise HTTPException(status_code = 400, detail = "Invalid credentials")
    
    token = create_access_token({"sub": user.email})
    return{"access_token": token, "token_type":"bearer"}
    
    
@router.get("/me")
async def read_current_user(user: User = Depends(get_current_user)):
    return {"email": user.email}