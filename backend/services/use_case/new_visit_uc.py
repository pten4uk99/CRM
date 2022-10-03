import datetime
import re

from services.aggregates.client.entity import Client
from services.aggregates.visit.entity import Visit, StatusChoice
from services.use_case.base import UseCase, UseCaseException
from services.use_case.base.uc_changed import NewVisitUseCaseChanged
from services.use_case.base.uc_init import NewVisitUseCaseInit
from services.use_case.response.response_core import CloseWorkShiftUseCaseResponse


class NewVisitUseCase(UseCase):
    _init: NewVisitUseCaseInit
    response_class = CloseWorkShiftUseCaseResponse

    def __init__(self, init: NewVisitUseCaseInit):
        super().__init__(init)

    @staticmethod
    def __parse_phone(phone: str) -> int:
        try:
            match = re.sub('[^0-9]', '', phone)
            return int(match)
        except (TypeError, ValueError):
            raise UseCaseException('Телефон должен быть в формате "+7(000)-000-00-00"')

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
            phone=self.__parse_phone(self._init.phone),
            name=self._init.name,
            last_name=self._init.last_name,
        )

    def _validate_datetime(self):
        dt_start = self._init.datetime_start
        dt_end = self._init.datetime_end

        if not dt_start or not dt_end:
            raise UseCaseException('Не передана дата визита')

        visits = self._init.day_visits

        if visits:
            for visit in visits:
                if visit.master.pk != self._init.master.pk:
                    continue

                msg = f'Конфликт времени! На выбранное время уже записан клиент: '

                if visit.client:
                    msg += f'"{visit.client.name} {visit.client.last_name}"'
                else:
                    msg += f'"{visit.datetime_start.time()} - {visit.datetime_end.time()}"'

                if visit.datetime_start <= dt_start < visit.datetime_end:
                    raise UseCaseException(msg)
                elif visit.datetime_start < dt_end < visit.datetime_end:
                    raise UseCaseException(msg)
                elif dt_start <= visit.datetime_start and dt_end >= visit.datetime_end:
                    raise UseCaseException(msg)

    @staticmethod
    def _validate_name(name):
        if name is not None:
            if len(name) >= 20:
                raise UseCaseException(f'Слишком длинное имя "{name}"')

    def _validate_data(self):
        data = self._init

        if data.phone is not None:
            phone = self.__parse_phone(data.phone)
            if len(str(phone)) != 11:
                raise UseCaseException('Неверное количество цифр в номере телефона (ожидалось 11)')

        self._validate_name(data.name)
        self._validate_name(data.last_name)

        self._validate_datetime()

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
