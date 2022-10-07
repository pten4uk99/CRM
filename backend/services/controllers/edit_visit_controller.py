import datetime
from typing import Optional

from services.aggregates.client.repository import ClientRepository
from services.aggregates.master.entity import Master
from services.aggregates.master.repository import MasterRepository
from services.aggregates.visit.entity import Visit, StatusChoice
from services.aggregates.visit.repository import VisitRepository
from services.controllers.base import UseCaseController
from services.use_case.base.uc_changed import EditVisitUseCaseChanged
from services.use_case.base.uc_init import EditVisitUseCaseInit
from services.use_case.base.utils import parse_phone
from services.use_case.edit_visit_uc import EditVisitUseCase


class EditVisitController(UseCaseController):
    use_case_class = EditVisitUseCase

    def __init__(self, session, visit_id: int, datetime_start: datetime.datetime = None,
                 datetime_end: datetime.datetime = None,
                 either_master: bool = None, master_id: int = None,
                 phone: str = None, name: str = None, last_name: str = None,
                 comment: str = None, paid: int = None, discount: int = None, card: int = None, client_id: int = None):
        super().__init__(session=session)

        self._visit_id = visit_id
        self._datetime_start = datetime_start
        self._datetime_end = datetime_end
        self._either_master = either_master
        self._phone = phone
        self._name = name
        self._last_name = last_name
        self._comment = comment
        self._paid = paid
        self._discount = discount
        self._card = card
        self._master_id = master_id
        self._client_id = client_id

    def __get_client(self):
        if self._client_id is not None:
            repo = ClientRepository(self.session)
            return repo.get(pk=self._client_id)

    def __get_master(self) -> Optional[Master]:
        repo = MasterRepository(self.session)
        return repo.get(self._master_id)

    def __get_day_visit_list(self):
        repo = VisitRepository(self.session)
        return repo.getlist(date=self._datetime_start.date())

    def __get_old_visit(self) -> Visit:
        repo = VisitRepository(self.session)
        return repo.get(pk=self._visit_id)

    def __get_existing_client(self):
        if self._phone is not None:
            repo = ClientRepository(self.session)
            return repo.get_by_phone(parse_phone(self._phone))

    def _get_use_case_init(self):
        return EditVisitUseCaseInit(
            existing_client=self.__get_existing_client(),
            day_visits=self.__get_day_visit_list(),
            old_visit=self.__get_old_visit(),
            datetime_start=self._datetime_start,
            datetime_end=self._datetime_end,
            either_master=self._either_master,
            phone=self._phone,
            name=self._name,
            last_name=self._last_name,
            comment=self._comment,
            paid=self._paid,
            discount=self._discount,
            card=self._card,
            master=self.__get_master(),
            client=self.__get_client()
        )

    def _save_use_case_result(self, use_case_changed: EditVisitUseCaseChanged) -> None:
        if use_case_changed.visit.client:
            client_repo = ClientRepository(self.session)
            use_case_changed.visit.client = client_repo.create_or_update(use_case_changed.visit.client)

        repo = VisitRepository(self.session)
        repo.set_instance(use_case_changed.visit)
        repo.update(use_case_changed.visit)
