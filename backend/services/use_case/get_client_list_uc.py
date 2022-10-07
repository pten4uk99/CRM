from services.use_case.base import UseCase
from services.use_case.base.uc_init import GetClientListUseCaseInit
from services.use_case.base.uc_out import GetClientListUseCaseOut
from services.use_case.response.response_core import GetClientListUseCaseResponse


class GetClientListUseCase(UseCase):
    _init: GetClientListUseCaseInit
    response_class = GetClientListUseCaseResponse

    def __init__(self, init: GetClientListUseCaseInit):
        super().__init__(init)

    def _perform_run(self):
        return GetClientListUseCaseOut(clients=self._init.clients)
