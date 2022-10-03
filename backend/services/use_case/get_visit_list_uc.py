from services.aggregates.visit.entity import Visit
from services.use_case.base import UseCase
from services.use_case.base.uc_init import GetVisitListUseCaseInit
from services.use_case.base.uc_out import GetVisitListUseCaseOut
from services.use_case.response.response_core import GetVisitListUseCaseResponse


class GetVisitListUseCase(UseCase):
    _init: GetVisitListUseCaseInit
    response_class = GetVisitListUseCaseResponse

    def __init__(self, init: GetVisitListUseCaseInit):
        super().__init__(init)

    @staticmethod
    def __generate_phone_values(phone: str):
        for number in phone:
            yield number

    def _format_phone(self, phone: int):
        str_phone = str(phone)
        phone_gen = self.__generate_phone_values(str_phone)
        new_phone = []

        plus = '+'
        open_bracket = '('
        close_bracket = ')'
        dash = '-'

        new_phone.append(plus)
        new_phone.append(next(phone_gen))
        new_phone.append(open_bracket)
        new_phone.append(next(phone_gen))
        new_phone.append(next(phone_gen))
        new_phone.append(next(phone_gen))
        new_phone.append(close_bracket)
        new_phone.append(next(phone_gen))
        new_phone.append(next(phone_gen))
        new_phone.append(next(phone_gen))
        new_phone.append(dash)
        new_phone.append(next(phone_gen))
        new_phone.append(next(phone_gen))
        new_phone.append(dash)
        new_phone.append(next(phone_gen))
        new_phone.append(next(phone_gen))

        return ''.join(new_phone)

    def _perform_run(self):
        for master in self._init.masters_with_visits:
            filtered_visits = []

            for visit in master.visits:
                visit: Visit

                visit.duration = (visit.datetime_end - visit.datetime_start).seconds // 60

                if visit.client:
                    visit.client.phone = self._format_phone(visit.client.phone)

                if visit.datetime_start.date() == self._init.date:
                    filtered_visits.append(visit)

            master.visits = filtered_visits
        return GetVisitListUseCaseOut(masters_with_visits=self._init.masters_with_visits)
