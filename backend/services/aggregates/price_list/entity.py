from dataclasses import dataclass
from enum import Enum
from typing import TypeVar

from services.aggregates.base import Entity

E = TypeVar('E', bound=Entity)


class PriceListType(Enum):
    one_price_item = 'one_price_item'
    three_price_item = 'three_price_item'


@dataclass
class PriceList(Entity):
    name: str
    type: PriceListType
    price_items: list[E] = None
    pk: int = None
