from infrastructure.database.models import OnePriceItemDB, PriceListDB, ThreePriceItemDB
from services.aggregates.base.adapters.base import EntityAdapter
from services.aggregates.price_item.entity import OnePriceItem, PriceItem, ThreePriceItem
from services.aggregates.price_list.entity import PriceList


class PriceListAdapter(EntityAdapter):
    @classmethod
    def one_price_item_db_to_entity(cls, obj: OnePriceItemDB, price_list_id: int) -> OnePriceItem:
        return OnePriceItem(
            name=obj.name,
            description=obj.description,
            price=obj.price,
            price_list_id=price_list_id
        )

    @classmethod
    def three_price_item_db_to_entity(cls, obj: ThreePriceItemDB, price_list_id: int) -> ThreePriceItem:
        return ThreePriceItem(
            name=obj.name,
            description=obj.description,
            shirt_price=obj.shirt_price,
            middle_price=obj.middle_price,
            long_price=obj.long_price,
            price_list_id=price_list_id
        )

    @classmethod
    def to_entity(cls, obj: PriceListDB, price_items: list[PriceItem]) -> PriceList:
        return PriceList(pk=obj.pk, name=obj.name, price_items=price_items)
