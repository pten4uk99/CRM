from services.aggregates.price_list.repository import PriceListRepository
from services.controllers.base import UseCaseController
from services.use_case.base.uc_init import GetPriceListUseCaseInit
from services.use_case.get_price_list_uc import GetPriceListUseCase


class GetPriceListController(UseCaseController):
    use_case_class = GetPriceListUseCase

    def __init__(self, session, price_list_id: int):
        super().__init__(session=session)

        self._price_list_id = price_list_id

    def __get_one_price_items_list(self):
        repo = PriceListRepository(self.session)
        return repo.getlist()

    def _get_use_case_init(self):
        return GetPriceListUseCaseInit(price_lists=self.__get_one_price_items_list())
