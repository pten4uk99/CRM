import datetime

from services.aggregates.visit.entity import Visit
from services.aggregates.visit.repository import VisitRepository
from services.controllers.base import UseCaseController
from services.use_case.base.uc_init import GetVisitListUseCaseInit
from services.use_case.get_visit_list_uc import GetVisitListUseCase


class GetVisitListController(UseCaseController):
    use_case_class = GetVisitListUseCase

    def __init__(self, session, date: datetime.date):
        super().__init__(session=session)

        self._date = date

    def __get_visits(self) -> list[Visit]:
        repo = VisitRepository(self.session)
        return repo.getlist(date=self._date)

    def _get_use_case_init(self):
        return GetVisitListUseCaseInit(visits=self.__get_visits())
