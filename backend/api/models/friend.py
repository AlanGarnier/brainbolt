# RESOURCES
from pydantic import BaseModel, field_validator
from typing import Optional


class Friend(BaseModel):
    _id: str
    friend_id: str
    status: str

    @field_validator('friend_id', 'status')
    def check_empty_fields(cls, value):
        if value == "":
            raise ValueError("Field cannot be empty")
        return value
