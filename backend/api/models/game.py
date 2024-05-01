# RESOURCES
from pydantic import BaseModel
from typing import Optional


class Game(BaseModel):
    _id: str
    name: str
    picture: Optional[str] = None
    theme: Optional[str] = None
    ranking: Optional[int] = None
