from dataclasses import dataclass
from typing import TypeVar

from services.aggregates.base import Entity


Visit = TypeVar('Visit', bound=Entity)

@dataclass
class Client(Entity):
    phone: int
    pk: int = None
    name: str = None
    last_name: str = None
    visits: list[Visit] = None
