from pydantic import BaseModel, EmailStr
class UserCreate(BaseModel):
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    login_email:EmailStr
    password:str