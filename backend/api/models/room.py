# RESOURCES
from pydantic import BaseModel
from typing import Optional


class Room(BaseModel):
    _id: str
    game_id: str
    player1_id: str
    player2_id: str