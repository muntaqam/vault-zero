from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError
from sqlmodel import Session, select
from server.db import get_session
from server.models.user import User
from server.auth.jwt_handler import decode_access_token

oauth2_scheme = OAuth2PasswordBearer(tokenUrl = "token")
async def get_current_user(token: str = Depends(oauth2_scheme), session: Session= Depends(get_session)):
    try:
        payload = decode_access_token(token)
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(status_code = 401, detail = "No user with this email")
    except JWTError:
        raise HTTPException(status_code = 401, detail="INvalid token")
    
    user = session.exec(select(User).where(User.email == email)).first()
    if user is None:
        raise HTTPException(status_code = 404, detail = "User not found")
    return user