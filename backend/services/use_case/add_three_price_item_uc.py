from services.aggregates.price_item.entity import ThreePriceItem
from services.use_case.base import UseCase
from services.use_case.base.uc_changed import AddThreePriceItemUseCaseChanged
from services.use_case.base.uc_init import AddThreePriceItemUseCaseInit
from services.use_case.response.response_core import AddThreePriceItemUseCaseResponse


class AddThreePriceItemUseCase(UseCase):
    _init: AddThreePriceItemUseCaseInit
    response_class = AddThreePriceItemUseCaseResponse

    def __init__(self, init: AddThreePriceItemUseCaseInit):
        super().__init__(init)

    def _perform_run(self):
        price_item = ThreePriceItem(
            name=self._init.name,
            description=self._init.description,
            shirt_price=self._init.shirt_price,
            middle_price=self._init.middle_price,
            long_price=self._init.long_price,
            price_list_id=self._init.price_list_id
        )
        self.changed_entities = AddThreePriceItemUseCaseChanged(three_price_item=price_item)
