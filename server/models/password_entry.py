from sqlmodel import SQLModel, Field
from typing import Optional 
from datetime import datetime

class PasswordEntry(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key = "user.id")
    name: str #label for password for example "gmail", "notion", "netflix"
    encrypted_data: str #encrypted password
    created_at: datetime = Field(default_factory = datetime.utcnow)