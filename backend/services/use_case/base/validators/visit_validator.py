import datetime

from services.aggregates.visit.entity import Visit
from services.use_case.base import UseCaseException
from services.use_case.base.validators.base_validator import Validator


class VisitValidator(Validator):
    def __init__(self, dt_start: datetime.datetime, dt_end: datetime.datetime, day_visits: list[Visit],
                 master_id: int, either_master: bool, phone: int, name: str,
                 last_name: str, comment: str, current_visit_id: int = None):
        self._dt_start = dt_start
        self._dt_end = dt_end
        self._either_master = either_master
        self._phone = phone
        self._name = name
        self._last_name = last_name
        self._comment = comment

        self._day_visits = day_visits
        self._master_id = master_id
        self._current_visit_id = current_visit_id

    def _validate_phone(self, phone):
        if phone is not None:
            if len(str(phone)) != 11:
                raise UseCaseException('Неверное количество цифр в номере телефона (ожидалось 11)')

            return phone

    def _validate_name(self, name):
        if name is not None:
            if len(name) >= 20:
                raise UseCaseException(f'Слишком длинное имя "{name}"')

            return name

    def _validate_last_name(self, last_name):
        if last_name is not None:
            if len(last_name) >= 20:
                raise UseCaseException(f'Слишком длинная фамилия "{last_name}"')

            return last_name

    def _validate_datetime(self, dt_start, dt_end):
        if not dt_start or not dt_end:
            return

        if dt_end - dt_start < datetime.timedelta(minutes=15):
            raise UseCaseException('Промежуток времени визита не может быть короче 15 минут')

        visits = self._day_visits

        if visits:
            for visit in visits:
                if visit.master.pk != self._master_id:
                    continue
                if visit.pk == self._current_visit_id:
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

    def validate(self):
        self._validate_phone(self._phone)
        self._validate_name(self._name)
        self._validate_last_name(self._last_name)
        self._validate_datetime(self._dt_start, self._dt_end)



