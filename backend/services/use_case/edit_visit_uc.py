import datetime
from typing import Optional

from services.aggregates.client.entity import Client
from services.aggregates.visit.entity import Visit
from services.use_case.base import UseCase, UseCaseException
from services.use_case.base.uc_changed import EditVisitUseCaseChanged
from services.use_case.base.uc_init import EditVisitUseCaseInit
from services.use_case.base.utils import parse_phone
from services.use_case.base.validators.visit_validator import VisitValidator
from services.use_case.response.response_core import EditVisitUseCaseResponse


class EditVisitUseCase(UseCase):
    _init: EditVisitUseCaseInit
    response_class = EditVisitUseCaseResponse

    def __init__(self, init: EditVisitUseCaseInit):
        super().__init__(init)

    def _get_master_id(self):
        if self._init.master:
            return self._init.master.pk
        else:
            return self._init.old_visit.master.pk

    def _get_datetime(self) -> tuple[Optional[datetime.datetime], Optional[datetime.datetime]]:
        old_visit = self._init.old_visit
        dt_start = None
        dt_end = None

        if self._init.master:
            if old_visit.master.pk == self._init.master.pk:
                dt_start = self._init.datetime_start if self._init.datetime_start != old_visit.datetime_start else None
                dt_end = self._init.datetime_end if self._init.datetime_end != old_visit.datetime_end else None
            else:
                dt_start = self._init.datetime_start
                dt_end = self._init.datetime_end

        return dt_start, dt_end

    def _validate_data(self, dt_start, dt_end):
        validator = VisitValidator(
            current_visit_id=self._init.old_visit.pk,
            comment=self._init.comment,
            day_visits=self._init.day_visits,
            dt_end=dt_end,
            dt_start=dt_start,
            either_master=self._init.either_master,
            last_name=self._init.last_name,
            name=self._init.name,
            master_id=self._get_master_id(),
            phone=parse_phone(self._init.phone)
        )
        validator.validate()

    def _new_client_from_existing(self):
        client: Client = self._init.old_visit.client
        name = self._init.name
        last_name = self._init.last_name
        phone = parse_phone(self._init.phone)

        if phone is None and client.phone is None:
            return None

        return Client(
            pk=client.pk or None,
            name=name or client.name,
            last_name=last_name or client.last_name,
            phone=phone or client.phone,
        )

    def _get_client(self):
        """ Проверяет передан ли self._init.client и, если передан, то возвращает объект Client """

        client = self._init.client

        if client is None:
            if self._init.phone is None:
                raise UseCaseException('Не переданы данные клиента для добавления')

            client = Client(
                name=self._init.name,
                last_name=self._init.last_name,
                phone=parse_phone(self._init.phone)
            )

        return client

    def _new_visit_from_existing(self, client: Client):
        visit = self._init.old_visit

        return Visit(
            pk=visit.pk or None,
            datetime_start=self._init.datetime_start or visit.datetime_start,
            datetime_end=self._init.datetime_end or visit.datetime_end,
            either_master=self._init.either_master if self._init.either_master is not None else visit.either_master,
            comment=self._init.comment or visit.comment,
            client=client,
            master=self._init.master or visit.master,
            status=visit.status,
            paid=self._init.paid or visit.paid,
            discount=self._init.discount or visit.discount,
            card=self._init.card or visit.card,
        )

    def _perform_run(self):
        dt_start, dt_end = None, None

        if self._init.phone is not None and self._init.existing_client is not None: 
            raise UseCaseException('Невозможно создать нового клиента с существующим номером. '
                                   'Выберите клиента из списка.')

        if self._init.old_visit.client is not None:
            dt_start, dt_end = self._get_datetime()
            client = self._new_client_from_existing()
        else:
            client = self._get_client()

        self._validate_data(dt_start, dt_end)
        visit = self._new_visit_from_existing(client)

        self.changed_entities = EditVisitUseCaseChanged(visit=visit)
