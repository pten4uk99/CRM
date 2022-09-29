from enum import Enum
from typing import TypedDict, Literal


class ResponseType(Enum):
    SUCCESS = 'success'
    ERROR = 'error'
    WARNING = 'warning'


class ResponseDict(TypedDict):
    status: Literal[ResponseType.SUCCESS, ResponseType.ERROR, ResponseType.WARNING]
    detail: str
    data: list
