from services.aggregates.price_list.entity import PriceListType
from services.aggregates.price_list.repository import PriceListRepository
from services.controllers.base import UseCaseController
from services.use_case.add_price_list_uc import AddPriceListUseCase
from services.use_case.base.uc_changed import AddPriceListUseCaseChanged
from services.use_case.base.uc_init import AddPriceListUseCaseInit


class AddPriceListController(UseCaseController):
    use_case_class = AddPriceListUseCase

    def __init__(self, session, name: str, type_: PriceListType):
        super().__init__(session=session)

        self._name = name
        self._type = type_

    def __get_existing_price_list(self):
        repo = PriceListRepository(self.session)
        return repo.get_by_name(name=self._name)

    def _get_use_case_init(self):
        return AddPriceListUseCaseInit(
            name=self._name,
            type=self._type,
            existing_price_list=self.__get_existing_price_list()
        )

    def _save_use_case_result(self, use_case_changed: AddPriceListUseCaseChanged):
        repo = PriceListRepository(self.session)
        repo.create(use_case_changed.price_list)
