# RESOURCES
from pydantic import BaseModel
from typing import Optional


class Ranking(BaseModel):
    _id: str
    users: Optional[list]

