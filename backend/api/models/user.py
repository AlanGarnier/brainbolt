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

    @field_validator('password')
    def validate_password(cls, value):
        # Check password length
        if len(value) < 8:
            raise ValueError('Password must be at least 8 characters')
        if not any(char.isupper() for char in value):
            raise ValueError('Password must be at least 1 uppercase letter')
        if not any(char.islower() for char in value):
            raise ValueError('Password must be at least 1 lowercase letter')
        if not any(char.isdigit() for char in value):
            raise ValueError('Password must be at least 1 digit')
