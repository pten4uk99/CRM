from services.aggregates.client.entity import Client
from services.aggregates.client.repository import ClientRepository
from services.aggregates.visit.repository import VisitRepository
from services.controllers.base import UseCaseController
from services.use_case.base.uc_init import ClientDetailUseCaseInit
from services.use_case.client_detail_uc import ClientDetailUseCase


class ClientDetailController(UseCaseController):
    use_case_class = ClientDetailUseCase

    def __init__(self, session, client_id: int):
        super().__init__(session)

        self._client_id = client_id

    def __get_client(self) -> Client:
        repo = ClientRepository(self.session)
        return repo.get(self._client_id)

    def __get_visits(self):
        repo = VisitRepository(self.session)
        return repo.get_by_client_id(self._client_id)

    def _get_use_case_init(self):
        return ClientDetailUseCaseInit(client=self.__get_client(), visits=self.__get_visits())
