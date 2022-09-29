from services.aggregates.price_item.entity import OnePriceItem
from services.use_case.base import UseCase
from services.use_case.base.uc_changed import AddOnePriceItemUseCaseChanged
from services.use_case.base.uc_init import AddOnePriceItemUseCaseInit
from services.use_case.response.response_core import AddOnePriceItemUseCaseResponse


class AddOnePriceItemUseCase(UseCase):
    _init: AddOnePriceItemUseCaseInit
    response_class = AddOnePriceItemUseCaseResponse

    def __init__(self, init: AddOnePriceItemUseCaseInit):
        super().__init__(init)

    def _perform_run(self):
        price_item = OnePriceItem(
            name=self._init.name,
            description=self._init.description,
            price=self._init.price,
            price_list_id=self._init.price_list_id
        )
        self.changed_entities = AddOnePriceItemUseCaseChanged(one_price_item=price_item)

