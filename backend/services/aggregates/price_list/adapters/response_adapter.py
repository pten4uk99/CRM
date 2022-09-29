from typing import TypedDict, Union

from services.aggregates.base.adapters.base import ResponseEntityAdapter
from services.aggregates.price_item.entity import OnePriceItem, ThreePriceItem
from services.aggregates.price_list.entity import PriceList


class PriceItemResponseDict(TypedDict):
    pk: int
    name: str
    description: str


class OnePriceItemResponseDict(PriceItemResponseDict):
    price: int


class ThreePriceItemResponseDict(PriceItemResponseDict):
    shirt_price: int
    middle_price: int
    long_price: int


class PriceListResponseDict(TypedDict):
    pk: int
    name: str
    price_items: list[Union[OnePriceItemResponseDict, ThreePriceItemResponseDict]]


class ResponsePriceListAdapter(ResponseEntityAdapter):
    @classmethod
    def _get_one_price_items_response_list(cls, price_items: list[OnePriceItem]) -> list[OnePriceItemResponseDict]:
        result = []

        for item in price_items:
            item: OnePriceItem
            result.append(OnePriceItemResponseDict(
                pk=item.pk,
                name=item.name,
                description=item.description,
                price=item.price
            ))

        return result

    @classmethod
    def _get_three_price_items_response_list(cls,
                                             price_items: list[ThreePriceItem]) -> list[ThreePriceItemResponseDict]:
        result = []

        for item in price_items:
            item: ThreePriceItem
            result.append(ThreePriceItemResponseDict(
                pk=item.pk,
                name=item.name,
                description=item.description,
                shirt_price=item.shirt_price,
                middle_price=item.middle_price,
                long_price=item.long_price
            ))

        return result

    @classmethod
    def from_entity(cls, obj: PriceList) -> PriceListResponseDict:
        price_items = []

        if obj.price_items:
            if isinstance(obj.price_items[0], OnePriceItem):
                price_items = cls._get_one_price_items_response_list(obj.price_items)
            elif isinstance(obj.price_items[0], ThreePriceItem):
                price_items = cls._get_three_price_items_response_list(obj.price_items)

        return PriceListResponseDict(pk=obj.pk, name=obj.name, price_items=price_items)
