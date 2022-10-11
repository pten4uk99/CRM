from dataclasses import dataclass
from enum import Enum

from services.aggregates.base import Entity


class PriceItemGroup(Enum):
    none = 'none'
    shirt = 'shirt'
    middle = 'middle'
    long = 'long'


@dataclass
class PriceItem(Entity):
    name: str
    description: str
    price: int
    price_group: PriceItemGroup
    pk: int = None

