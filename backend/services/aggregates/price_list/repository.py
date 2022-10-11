from infrastructure.database.models import PriceListDB
from services.aggregates.base.repository.base import Repository
from services.aggregates.price_list.adapters.model_adapter import PriceListAdapter
from services.aggregates.price_list.entity import PriceList


class PriceListRepository(Repository):
    adapter_class = PriceListAdapter
    db_model = PriceListDB

    def _get(self, pk: int):
        price_list = self.session.query(PriceListDB).get(pk)
        return price_list

    def get_by_name(self, name: str):
        price_list = self.session.query(PriceListDB).filter(PriceListDB.name == name).first()
        if price_list:
            return self.adapter_class.to_entity(price_list)

    def getlist(self, *args, **kwargs) -> list[PriceList]:
        price_lists_db: list[PriceListDB] = self.session.query(PriceListDB).all()

        result: list[PriceList] = []

        for price_list_db in price_lists_db:
            result.append(self.adapter_class.to_entity(price_list_db))
        return result

    def create(self, instance: PriceList):
        price_list = PriceListDB(name=instance.name, type=instance.type.name)
        self.session.add(price_list)
        self.session.commit()
