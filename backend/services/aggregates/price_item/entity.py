from dataclasses import dataclass
from enum import Enum
from typing import TypeVar

from services.aggregates.base import Entity

PriceList = TypeVar('PriceList', bound=Entity)


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
    price_list: PriceList = None
