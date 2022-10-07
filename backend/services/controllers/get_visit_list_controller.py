import datetime

from services.aggregates.master.entity import Master
from services.aggregates.work_day.entity import WorkDay
from services.aggregates.work_day.repository import WorkDayRepository
from services.controllers.base import UseCaseController
from services.use_case.base.uc_init import GetVisitListUseCaseInit
from services.use_case.get_visit_list_uc import GetVisitListUseCase


class GetVisitListController(UseCaseController):
    use_case_class = GetVisitListUseCase

    def __init__(self, session, date: datetime.date):
        super().__init__(session=session)

        self._date = date

    def __get_masters(self) -> list[Master]:
        repo = WorkDayRepository(self.session)
        work_day: WorkDay = repo.get(date=self._date)
        return work_day.masters or []

    def _get_use_case_init(self):
        return GetVisitListUseCaseInit(masters_with_visits=self.__get_masters(), date=self._date)
