from services.aggregates.price_item.repository import PriceItemRepository
from services.controllers.base import UseCaseController
from services.use_case.add_three_price_item_uc import AddThreePriceItemUseCase
from services.use_case.base.uc_changed import AddThreePriceItemUseCaseChanged
from services.use_case.base.uc_init import AddThreePriceItemUseCaseInit


class AddThreePriceItemController(UseCaseController):
    use_case_class = AddThreePriceItemUseCase

    def __init__(self, session, name: str, shirt_price: int,
                 middle_price: int, long_price: int,
                 price_list_id: int, description: str = ''):
        super().__init__(session=session)

        self._name = name
        self._shirt_price = shirt_price
        self._middle_price = middle_price
        self._long_price = long_price
        self._description = description
        self._price_list_id = price_list_id

    def _get_use_case_init(self):
        return AddThreePriceItemUseCaseInit(
            name=self._name,
            shirt_price=self._shirt_price,
            middle_price=self._middle_price,
            long_price=self._long_price,
            description=self._description,
            price_list_id=self._price_list_id,
        )

    def _save_use_case_result(self, use_case_changed: AddThreePriceItemUseCaseChanged):
        repo = PriceItemRepository(self.session)
        repo.create_three_price_item(use_case_changed.three_price_item)
