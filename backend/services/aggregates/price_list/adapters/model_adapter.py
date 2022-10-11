from infrastructure.database.models import PriceListDB, PriceItemDB
from services.aggregates.base.adapters.base import EntityAdapter
from services.aggregates.price_item.entity import PriceItem, PriceItemGroup
from services.aggregates.price_list.entity import PriceList, PriceListType


class PriceListAdapter(EntityAdapter):
    @classmethod
    def _get_price_items(cls, price_items: list[PriceItemDB]) -> list[PriceItem]:
        result = []

        for item in price_items:
            result.append(PriceItem(
                pk=item.pk,
                name=item.name,
                description=item.description,
                price_group=getattr(PriceItemGroup, item.price_group),
                price=item.price,
            ))

        return result

    @classmethod
    def to_entity(cls, obj: PriceListDB) -> PriceList:
        return PriceList(
            pk=obj.pk,
            name=obj.name,
            price_items=cls._get_price_items(obj.price_items),
            type=getattr(PriceListType, obj.type)
        )
