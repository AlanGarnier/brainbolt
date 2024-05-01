# RESOURCES
from pydantic import BaseModel
from typing import Optional


class Chat(BaseModel):
    _id: str
    message: Optional[list]
    match: Optional[str]
    users: Optional[list]
