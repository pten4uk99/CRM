from infrastructure.database.models import PriceItemDB
from services.aggregates.base.adapters.base import EntityAdapter
from services.aggregates.price_item.entity import PriceItem, PriceItemGroup


class PriceItemAdapter(EntityAdapter):
    @classmethod
    def to_entity(cls, obj: PriceItemDB) -> PriceItem:
        return PriceItem(
            pk=obj.pk,
            name=obj.name,
            description=obj.description,
            price_group=getattr(PriceItemGroup, obj.price_group),
            price=obj.price
        )

    @classmethod
    def from_entity(cls, obj: PriceItem) -> PriceItemDB:
        return PriceItemDB(
            pk=obj.pk,
            name=obj.name,
            description=obj.description,
            price_group=obj.price_group.name,
            price=obj.price,
        )


