from typing import Optional, TypedDict
from datetime import date

class Task(TypedDict):
    id: Optional[int]
    text: str
    done: bool
    expire: Optional[date]
