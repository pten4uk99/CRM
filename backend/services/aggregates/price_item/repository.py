from infrastructure.database.models import PriceItemDB
from services.aggregates.base.repository.base import Repository
from services.aggregates.price_item.adapters.model_adapter import PriceItemAdapter
from services.aggregates.price_item.entity import PriceItem
from services.aggregates.price_list.entity import PriceList


class PriceItemRepository(Repository):
    adapter_class = PriceItemAdapter
    db_model = PriceItem

    def _get(self, pk: int) -> PriceItemDB:
        return self.session.query(PriceItemDB).get(pk)

    def create_with_price_list(self, price_item: PriceItem, price_list: PriceList):
        price_item_db = self.adapter_class.from_entity(price_item)
        price_item_db.price_list_id = price_list.pk

        self.session.add(price_item_db)
        self.session.commit()
