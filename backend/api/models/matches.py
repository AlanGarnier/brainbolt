# RESOURCES
from pydantic import BaseModel
from typing import Optional


class Matches(BaseModel):
    _id: str
    chat: Optional[str]
    game: Optional[str]
    winner: Optional[str]
    user_1: Optional[str]
    user_2: Optional[str]
