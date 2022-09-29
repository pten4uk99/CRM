from services.aggregates.master.repository import MasterRepository
from services.controllers.base import UseCaseController
from services.use_case.base.uc_init import GetTimeTableUseCaseInit
from services.use_case.get_timetable_uc import GetTimeTableUseCase


class GetTimeTableController(UseCaseController):
    use_case_class = GetTimeTableUseCase

    def __init__(self, session, year: int, month: int):
        super().__init__(session=session)

        self._year = year
        self._month = month

    def __get_masters(self):
        repo = MasterRepository(self.session)
        masters = repo.getlist()

        for master in masters:
            work_days = repo.get_associate_master_work_days(
                master_id=master.pk, year=self._year, month=self._month)
            master.work_days = work_days
        return masters

    def _get_use_case_init(self):
        return GetTimeTableUseCaseInit(masters=self.__get_masters())
