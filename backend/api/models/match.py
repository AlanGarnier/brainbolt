# RESOURCES
from pydantic import BaseModel
from typing import Optional


class Match(BaseModel):
    _id: str
    isDone: bool
    room: str
    score: Optional[str]
    winner: Optional[str]
    user_1: str
    user_2: str
