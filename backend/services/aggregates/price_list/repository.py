from infrastructure.database.generic_table import PriceItemGenericTables
from infrastructure.database.models import OnePriceItemDB, PriceItemGenericLinkDB, PriceListDB, ThreePriceItemDB
from services.aggregates.base.repository.base import Repository
from services.aggregates.price_item.entity import OnePriceItem, PriceItem, ThreePriceItem
from services.aggregates.price_list.adapters.model_adapter import PriceListAdapter
from services.aggregates.price_list.entity import PriceList


class PriceListRepository(Repository):
    adapter_class = PriceListAdapter

    def _adapt_one_price_items_db_to_entity(self,
                                            one_price_items: list[OnePriceItemDB],
                                            price_list_id: int) -> list[OnePriceItem]:
        result = []

        for item in one_price_items:
            result.append(self.adapter_class.one_price_item_db_to_entity(item, price_list_id=price_list_id))

        return result

    def _adapt_three_price_items_db_to_entity(self,
                                              three_price_items: list[ThreePriceItemDB],
                                              price_list_id: int) -> list[ThreePriceItem]:

        result = []

        for item in three_price_items:
            result.append(self.adapter_class.three_price_item_db_to_entity(item, price_list_id=price_list_id))

        return result

    def __get_price_items_ids(self, generic_links: list[PriceItemGenericLinkDB]) -> list[int]:
        """ Формирует список с id элементов прайс листа """

        price_items_ids = []

        for link in generic_links:
            price_items_ids.append(link.object_id)

        return price_items_ids

    def _get_one_price_items(self, generic_links: list[PriceItemGenericLinkDB]) -> list[OnePriceItem]:
        price_items_ids = self.__get_price_items_ids(generic_links)

        price_items_db = self.session.query(OnePriceItemDB).filter(OnePriceItemDB.pk.in_(price_items_ids))
        price_items = self._adapt_one_price_items_db_to_entity(
            one_price_items=price_items_db, price_list_id=generic_links[0].price_list_id)

        return price_items

    def _get_three_price_items(self, generic_links: list[PriceItemGenericLinkDB]) -> list[ThreePriceItem]:
        price_items_ids = self.__get_price_items_ids(generic_links)

        price_items_db = self.session.query(ThreePriceItemDB).filter(ThreePriceItemDB.pk.in_(price_items_ids))
        price_items = self._adapt_three_price_items_db_to_entity(
            three_price_items=price_items_db, price_list_id=generic_links[0].price_list_id)

        return price_items

    def _get_price_items(self, generic_links: list[PriceItemGenericLinkDB]) -> list[PriceItem]:
        """ Проверяет к какой категории относится PriceItem и возвращает соответственный список """

        result = []

        if generic_links:
            link = generic_links[0]

            if link.table_name == PriceItemGenericTables.one_price_item.name:
                result = self._get_one_price_items(generic_links)
            elif link.table_name == PriceItemGenericTables.three_price_item.name:
                result = self._get_three_price_items(generic_links)

            return result

    def getlist(self, *args, **kwargs) -> list[PriceList]:
        price_lists_db: list[PriceListDB] = self.session.query(PriceListDB).all()

        result: list[PriceList] = []

        for price_list_db in price_lists_db:
            generic_link_query = self.session.query(PriceItemGenericLinkDB)
            filtered_query = generic_link_query.filter(PriceItemGenericLinkDB.price_list_id == price_list_db.pk)
            generic_links: list[PriceItemGenericLinkDB] = filtered_query.all()

            price_items = self._get_price_items(generic_links)

            result.append(PriceList(pk=price_list_db.pk, name=price_list_db.name, price_items=price_items))

        return result

    def create(self, instance: PriceList):
        price_list = PriceListDB(name=instance.name)
        self.session.add(price_list)
        self.session.commit()
