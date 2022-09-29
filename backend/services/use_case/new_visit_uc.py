import datetime

from services.aggregates.client.entity import Client
from services.aggregates.visit.entity import Visit, StatusChoice
from services.use_case.base import UseCase
from services.use_case.base.uc_changed import NewVisitUseCaseChanged
from services.use_case.base.uc_init import NewVisitUseCaseInit
from services.use_case.response.response_core import CloseWorkShiftUseCaseResponse


class NewVisitUseCase(UseCase):
    _init: NewVisitUseCaseInit
    response_class = CloseWorkShiftUseCaseResponse

    def __init__(self, init: NewVisitUseCaseInit):
        super().__init__(init)

    def __get_status(self) -> StatusChoice:
        """
        Проверяет, если визит назначен не позже чем на завтрашний день, то статус - confirmed,
        Иначе - need_confirm
        """

        maximal_date_for_confirmed_status = datetime.date.today() + datetime.timedelta(days=2)

        if self._init.datetime_start.date() < maximal_date_for_confirmed_status:
            return StatusChoice.confirmed
        else:
            return StatusChoice.need_confirm

    def __create_visit_without_client(self) -> Visit:
        return Visit(
            datetime_start=self._init.datetime_start,
            datetime_end=self._init.datetime_end,
            status=self.__get_status(),
            master=self._init.master,
        )

    def __create_visit_with_client(self, new_client: Client = None) -> Visit:
        client = new_client if new_client is not None else self._init.client

        return Visit(
            datetime_start=self._init.datetime_start,
            datetime_end=self._init.datetime_end,
            status=self.__get_status(),
            master=self._init.master,
            client=client,
        )

    def __create_client(self) -> Client:
        return Client(
            phone=self._init.phone,
            name=self._init.name,
            last_name=self._init.last_name,
            comment=self._init.comment
        )

    def _perform_run(self):
        client = None

        if self._init.phone is None and self._init.client is None:
            visit = self.__create_visit_without_client()
        elif self._init.client is None:
            client = self.__create_client()
            visit = self.__create_visit_with_client(client)
        else:
            visit = self.__create_visit_with_client()

        self.changed_entities = NewVisitUseCaseChanged(visit=visit, client=client)


