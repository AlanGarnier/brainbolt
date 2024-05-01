# RESOURCES
from pydantic import BaseModel
from typing import Optional


class Score(BaseModel):
    _id: str
    user: Optional[str]
    match: Optional[str]
    score: Optional[int]

