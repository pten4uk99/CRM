from services.use_case.base import UseCase
from services.use_case.base.uc_init import ClientDetailUseCaseInit
from services.use_case.response.response_core import ClientDetailUseCaseResponse


class ClientDetailUseCase(UseCase):
    _init: ClientDetailUseCaseInit
    response_class = ClientDetailUseCaseResponse

    def _perform_run(self):
        pass
