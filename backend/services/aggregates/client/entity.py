from dataclasses import dataclass

from services.aggregates.base import Entity


@dataclass
class Client(Entity):
    phone: int
    pk: int = None
    name: str = None
    last_name: str = None
    visits: list[Entity] = None
