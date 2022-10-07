from services.aggregates.client.repository import ClientRepository
from services.controllers.base import UseCaseController
from services.use_case.base.uc_init import GetClientListUseCaseInit
from services.use_case.base.utils import parse_phone
from services.use_case.get_client_list_uc import GetClientListUseCase


class GetClientListController(UseCaseController):
    use_case_class = GetClientListUseCase

    def __init__(self, session, name: str = None, last_name: str = None, phone: str = None):
        super().__init__(session)

        self._name = name
        self._last_name = last_name
        self._phone = parse_phone(phone) if phone else None

    def __get_client_list(self):
        repo = ClientRepository(self.session)
        return repo.getlist(name=self._name, last_name=self._last_name, phone=self._phone)

    def _get_use_case_init(self):
        return GetClientListUseCaseInit(clients=self.__get_client_list())

