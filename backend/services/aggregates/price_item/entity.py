from dataclasses import dataclass

from services.aggregates.base import Entity


@dataclass
class PriceItem(Entity):
    name: str
    description: str
    price_list_id: int


@dataclass
class OnePriceItem(PriceItem):
    price: int
    pk: int = None


@dataclass
class ThreePriceItem(PriceItem):
    shirt_price: int
    middle_price: int
    long_price: int
    pk: int = None
