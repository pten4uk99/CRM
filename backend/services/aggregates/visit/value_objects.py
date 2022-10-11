from dataclasses import dataclass
from typing import TypeVar

from services.aggregates.base import ValueObject, Entity

PriceItem = TypeVar('PriceItem', bound=Entity)


@dataclass
class Service(ValueObject):
    quantity: int
    price_item: PriceItem
