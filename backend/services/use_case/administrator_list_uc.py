from services.use_case.base import UseCase
from services.use_case.base.uc_init import AdministratorListUseCaseInit
from services.use_case.base.uc_out import AdministratorListUseCaseOut
from services.use_case.response.response_core import AdministratorListUseCaseResponse


class AdministratorListUseCase(UseCase):
    _init: AdministratorListUseCaseInit
    response_class = AdministratorListUseCaseResponse

    def __init__(self, init: AdministratorListUseCaseInit):
        super().__init__(init)

    def _perform_run(self):
        return AdministratorListUseCaseOut(administrators=self._init.administrators)
