from services.aggregates.master.repository import MasterRepository
from services.controllers.base import UseCaseController
from services.use_case.base.uc_changed import SetMasterTimeTableUseCaseChanged
from services.use_case.base.uc_init import SetMasterTimeTableUseCaseInit
from services.use_case.base.uc_to_delete import SetMasterTimeTableToDelete
from services.use_case.set_master_timetable_uc import SetMasterTimeTableUseCase


class SetMasterTimeTableController(UseCaseController):
    use_case_class = SetMasterTimeTableUseCase

    def __init__(self, session, master_id: int, year: int, month: int, work_days: list[int]):
        super().__init__(session=session)

        self._master_id = master_id
        self._year = year
        self._month = month
        self._work_days = work_days

    def __get_current_work_days(self):
        repo = MasterRepository(self.session)
        master_work_days = repo.get_associate_master_work_days(
            master_id=self._master_id, year=self._year, month=self._month)
        return master_work_days

    def _get_use_case_init(self):
        return SetMasterTimeTableUseCaseInit(
            year=self._year,
            month=self._month,
            current_work_days=self.__get_current_work_days(),
            new_work_days=self._work_days
        )

    def _save_use_case_result(self, use_case_changed: SetMasterTimeTableUseCaseChanged):
        repo = MasterRepository(self.session)
        master = repo.get(self._master_id)
        repo.set_instance(master)

        for work_day in use_case_changed.work_days:
            repo.add_work_day_to_instance(work_day, commit=False)

        repo.commit()
        return use_case_changed

    def _delete_entities_result(self, use_case_to_delete: SetMasterTimeTableToDelete):
        repo = MasterRepository(self.session)
        master = repo.get(self._master_id)
        repo.set_instance(master)

        for work_day in use_case_to_delete.work_days:
            repo.remove_work_day_from_instance(work_day, commit=False)

        repo.commit()
        return use_case_to_delete
