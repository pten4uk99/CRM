from infrastructure.database.generic_table import PriceItemGenericTables
from infrastructure.database.models import PriceItemGenericLinkDB
from services.aggregates.base.repository.base import Repository
from services.aggregates.price_item.adapters.model_adapter import PriceItemAdapter
from services.aggregates.price_item.entity import OnePriceItem, ThreePriceItem


class PriceItemRepository(Repository):
    adapter_class = PriceItemAdapter

    def create_one_price_item(self, obj: OnePriceItem) -> None:
        price_item_db = self.adapter_class.to_one_price_item_db(obj)
        self.session.add(price_item_db)
        self.session.commit()

        generic_link = PriceItemGenericLinkDB(
            table_name=PriceItemGenericTables.one_price_item.name,
            object_id=price_item_db.pk,
            price_list_id=obj.price_list_id
        )
        self.session.add(generic_link)
        self.session.commit()

    def create_three_price_item(self, obj: ThreePriceItem) -> None:
        price_item_db = self.adapter_class.to_three_price_item_db(obj)
        self.session.add(price_item_db)
        self.session.commit()

        generic_link = PriceItemGenericLinkDB(
            table_name=PriceItemGenericTables.three_price_item.name,
            object_id=price_item_db.pk,
            price_list_id=obj.price_list_id
        )
        self.session.add(generic_link)
        self.session.commit()
