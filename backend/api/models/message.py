# RESOURCES
from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class Message(BaseModel):
    _id: str
    content: str
    time: datetime
    user: str
    room: str
