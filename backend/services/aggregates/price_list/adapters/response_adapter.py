from typing import TypedDict

from services.aggregates.base.adapters.base import ResponseEntityAdapter
from services.aggregates.price_item.entity import PriceItem, PriceItemGroup
from services.aggregates.price_list.entity import PriceList, PriceListType


class PriceItemResponseDict(TypedDict):
    pk: int
    name: str
    description: str
    price_group: PriceItemGroup
    price: int


class PriceListResponseDict(TypedDict):
    pk: int
    name: str
    type: PriceListType
    price_items: list[PriceItemResponseDict]


class ResponsePriceListAdapter(ResponseEntityAdapter):
    @classmethod
    def _get_price_items_response_list(cls, price_items: list[PriceItem]) -> list[PriceItemResponseDict]:
        result = []

        for item in price_items:
            result.append(PriceItemResponseDict(
                pk=item.pk,
                name=item.name,
                description=item.description,
                price_group=item.price_group,
                price=item.price
            ))

        return result

    @classmethod
    def from_entity(cls, obj: PriceList) -> PriceListResponseDict:
        price_items = []

        if obj.price_items:
            price_items = cls._get_price_items_response_list(obj.price_items)
        return PriceListResponseDict(pk=obj.pk, name=obj.name, type=obj.type, price_items=price_items)
