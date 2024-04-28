# RESOURCES
from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class Messages(BaseModel):
    _id: str
    contenu: str
    heure: datetime
    user: Optional[str]
