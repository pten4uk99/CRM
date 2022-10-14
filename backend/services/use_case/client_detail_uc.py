from services.use_case.base import UseCase
from services.use_case.base.uc_init import ClientDetailUseCaseInit
from services.use_case.base.uc_out import ClientDetailUseCaseOut
from services.use_case.response.response_core import ClientDetailUseCaseResponse


class ClientDetailUseCase(UseCase):
    _init: ClientDetailUseCaseInit
    response_class = ClientDetailUseCaseResponse

    def _perform_run(self):
        client = self._init.client
        client.visits = self._init.visits
        return ClientDetailUseCaseOut(client=client)
