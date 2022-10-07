import datetime
from typing import Optional

from services.aggregates.client.entity import Client
from services.aggregates.client.repository import ClientRepository
from services.aggregates.master.entity import Master
from services.aggregates.master.repository import MasterRepository
from services.aggregates.visit.repository import VisitRepository
from services.controllers.base import UseCaseController
from services.use_case.base.uc_changed import NewVisitUseCaseChanged
from services.use_case.base.uc_init import NewVisitUseCaseInit
from services.use_case.base.utils import parse_phone
from services.use_case.new_visit_uc import NewVisitUseCase


class NewVisitController(UseCaseController):
    use_case_class = NewVisitUseCase

    def __init__(self, session, datetime_start: datetime.datetime,
                 datetime_end: datetime.datetime, either_master: bool, master_id: int,
                 phone: str = None, name: str = None, last_name: str = None,
                 comment: str = None, client_id: int = None):
        super().__init__(session=session)

        self._datetime_start = datetime_start
        self._datetime_end = datetime_end
        self._either_master = either_master
        self._phone = phone
        self._name = name
        self._last_name = last_name
        self._comment = comment
        self._client_id = client_id
        self._master_id = master_id

    def __get_client(self) -> Optional[Client]:
        if self._client_id is not None:
            repo = ClientRepository(self.session)
            return repo.get(self._client_id)

    def __get_existing_client(self):
        if self._phone is not None:
            repo = ClientRepository(self.session)
            return repo.get_by_phone(parse_phone(self._phone))

    def __get_master(self) -> Optional[Master]:
        repo = MasterRepository(self.session)
        return repo.get(self._master_id)

    def __get_day_visit_list(self):
        repo = VisitRepository(self.session)
        return repo.getlist(date=self._datetime_start.date())

    def _get_use_case_init(self):
        return NewVisitUseCaseInit(
            existing_client=self.__get_existing_client(),
            day_visits=self.__get_day_visit_list(),
            datetime_start=self._datetime_start,
            datetime_end=self._datetime_end,
            either_master=self._either_master,
            phone=self._phone,
            name=self._name,
            last_name=self._last_name,
            comment=self._comment,
            client=self.__get_client(),
            master=self.__get_master(),
        )

    def _save_use_case_result(self, use_case_changed: NewVisitUseCaseChanged) -> None:
        if use_case_changed.client:
            client_repo = ClientRepository(self.session)
            use_case_changed.visit.client = client_repo.get_or_create(use_case_changed.client)
        repo = VisitRepository(self.session)
        repo.create(use_case_changed.visit)
