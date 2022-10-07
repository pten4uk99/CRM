import datetime
import re
from typing import Optional

from services.aggregates.client.entity import Client
from services.aggregates.visit.entity import Visit, StatusChoice
from services.use_case.base import UseCase, UseCaseException
from services.use_case.base.uc_changed import NewVisitUseCaseChanged
from services.use_case.base.uc_init import NewVisitUseCaseInit
from services.use_case.base.utils import parse_phone
from services.use_case.base.validators.visit_validator import VisitValidator
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
            either_master=self._init.either_master,
            status=self.__get_status(),
            master=self._init.master,
            comment=self._init.comment,
        )

    def __create_visit_with_client(self, new_client: Client = None) -> Visit:
        client = new_client if new_client is not None else self._init.client

        return Visit(
            datetime_start=self._init.datetime_start,
            datetime_end=self._init.datetime_end,
            either_master=self._init.either_master,
            status=self.__get_status(),
            master=self._init.master,
            client=client,
            comment=self._init.comment,
        )

    def __create_client(self) -> Client:
        return Client(
            phone=parse_phone(self._init.phone),
            name=self._init.name,
            last_name=self._init.last_name,
        )

    def _validate_data(self):
        if not self._init.datetime_start or not self._init.datetime_end:
            raise UseCaseException('Не передана дата визита')

        if self._init.phone is not None and self._init.existing_client is not None:
            raise UseCaseException('Данный номер телефона уже существует. Выберите клиента из списка.')

        validator = VisitValidator(
            dt_start=self._init.datetime_start,
            dt_end=self._init.datetime_end,
            day_visits=self._init.day_visits,
            master_id=self._init.master.pk,
            comment=self._init.comment,
            either_master=self._init.either_master,
            last_name=self._init.last_name,
            name=self._init.name,
            phone=parse_phone(self._init.phone),
        )
        validator.validate()

    def _perform_run(self):
        self._validate_data()

        client = None

        if self._init.phone is None and self._init.client is None:
            visit = self.__create_visit_without_client()
        elif self._init.client is None:
            client = self.__create_client()
            visit = self.__create_visit_with_client(client)
        else:
            visit = self.__create_visit_with_client()

        self.changed_entities = NewVisitUseCaseChanged(visit=visit, client=client)
