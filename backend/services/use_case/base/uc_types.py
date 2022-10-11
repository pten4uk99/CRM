from dataclasses import dataclass

from services.aggregates.price_item.entity import PriceItem


@dataclass
class VisitPaymentPriceItemIn:
    pk: int
    quantity: int


@dataclass
class VisitPaymentService:
    price_item: PriceItem
    quantity: int

