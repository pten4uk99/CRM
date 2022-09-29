from services.use_case.base import UseCase
from services.use_case.base.uc_init import GetPriceListUseCaseInit
from services.use_case.base.uc_out import GetPriceListUseCaseOut
from services.use_case.response.response_core import GetPriceListUseCaseResponse


class GetPriceListUseCase(UseCase):
    _init: GetPriceListUseCaseInit
    response_class = GetPriceListUseCaseResponse

    def __init__(self, init: GetPriceListUseCaseInit):
        super().__init__(init)

    def _perform_run(self) -> GetPriceListUseCaseOut:
        return GetPriceListUseCaseOut(price_lists=self._init.price_lists)
