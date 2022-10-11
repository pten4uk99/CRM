from services.aggregates.price_item.entity import PriceItem, PriceItemGroup
from services.aggregates.price_list.entity import PriceListType
from services.use_case.base import UseCase, UseCaseException
from services.use_case.base.uc_changed import AddThreePriceItemUseCaseChanged
from services.use_case.base.uc_init import AddThreePriceItemUseCaseInit
from services.use_case.response.response_core import AddThreePriceItemUseCaseResponse


class AddThreePriceItemUseCase(UseCase):
    _init: AddThreePriceItemUseCaseInit
    response_class = AddThreePriceItemUseCaseResponse

    def __init__(self, init: AddThreePriceItemUseCaseInit):
        super().__init__(init)

    def _validate_equals_price(self):
        if (self._init.shirt_price == self._init.middle_price or
                self._init.middle_price == self._init.long_price or
                self._init.shirt_price == self._init.long_price):
            raise UseCaseException('Невозможно указать одинаковые цены')

    def _validate_price(self, price):
        if type(price) != int or not (0 < price < 10000):
            raise UseCaseException('Цена должна быть в диапазоне от 0 до 9999')

    def _validate_data(self):
        if self._init.price_list.type != PriceListType.three_price_item:
            raise UseCaseException('К выбранному прайс листу невозможно добавить элемент с одной ценой')
        if len(self._init.name) > 50:
            raise UseCaseException('Максимальная длина названия - 50 символов')

        self._validate_equals_price()
        self._validate_price(self._init.shirt_price)
        self._validate_price(self._init.middle_price)
        self._validate_price(self._init.long_price)

    def _perform_run(self):
        self._validate_data()

        shirt_price_item = PriceItem(
            name=self._init.name.capitalize(),
            description=self._init.description,
            price=self._init.shirt_price,
            price_group=PriceItemGroup.shirt
        )
        middle_price_item = PriceItem(
            name=self._init.name.capitalize(),
            description=self._init.description,
            price=self._init.middle_price,
            price_group=PriceItemGroup.middle
        )
        long_price_item = PriceItem(
            name=self._init.name.capitalize(),
            description=self._init.description,
            price=self._init.long_price,
            price_group=PriceItemGroup.long
        )

        self.changed_entities = AddThreePriceItemUseCaseChanged(
            price_items=[shirt_price_item, middle_price_item, long_price_item], price_list=self._init.price_list)
