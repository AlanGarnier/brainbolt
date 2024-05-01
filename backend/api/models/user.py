# RESOURCES
from pydantic import BaseModel, EmailStr, field_validator
from typing import Optional


class User(BaseModel):
    _id: str
    pseudo: str
    picture: Optional[str]
    email: EmailStr
    score: Optional[list]
    password: str
