from infrastructure.database.models import OnePriceItemDB, ThreePriceItemDB
from services.aggregates.base.adapters.base import EntityAdapter
from services.aggregates.price_item.entity import OnePriceItem, ThreePriceItem


class PriceItemAdapter(EntityAdapter):
    @classmethod
    def to_one_price_item_db(cls, obj: OnePriceItem) -> OnePriceItemDB:
        return OnePriceItemDB(name=obj.name, description=obj.description, price=obj.price)

    @classmethod
    def to_three_price_item_db(cls, obj: ThreePriceItem) -> ThreePriceItemDB:
        return ThreePriceItemDB(
            name=obj.name,
            description=obj.description,
            shirt_price=obj.shirt_price,
            middle_price=obj.middle_price,
            long_price=obj.long_price
        )

