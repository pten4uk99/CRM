from dataclasses import dataclass
from typing import TypeVar

from services.aggregates.base import Entity

E = TypeVar('E', bound=Entity)


@dataclass
class PriceList(Entity):
    name: str
    price_items: list[E] = None
    pk: int = None
