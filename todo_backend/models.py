from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class Todo(BaseModel):
    id: int
    title: str
    created_at: datetime

class TodoCreate(BaseModel):
    title: str
