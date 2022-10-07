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

    def _perform_run(self):
        for master in self._init.masters_with_visits:
            filtered_visits = []

            for visit in master.visits:
                visit: Visit

                if visit.delete_reason is not None:
                    continue

                visit.duration = (visit.datetime_end - visit.datetime_start).seconds // 60

                if visit.datetime_start.date() == self._init.date:
                    filtered_visits.append(visit)

            master.visits = filtered_visits
        return GetVisitListUseCaseOut(masters_with_visits=self._init.masters_with_visits)
