from services.aggregates.administrator.repository import AdministratorRepository
from services.aggregates.work_shift.repository import WorkShiftRepository
from services.controllers.base import UseCaseController
from services.use_case.base.uc_changed import OpenWorkShiftUseCaseChanged, CloseWorkShiftUseCaseChanged
from services.use_case.base.uc_init import OpenWorkShiftUseCaseInit, CloseWorkShiftUseCaseInit
from services.use_case.close_work_whift_uc import CloseWorkShiftUseCase


class CloseWorkShiftController(UseCaseController):
    use_case_class = CloseWorkShiftUseCase

    def __init__(self, session, work_shift_id: int):
        super().__init__(session=session)

        self._work_shift_id = work_shift_id

    def __get_work_shift(self):
        repo = WorkShiftRepository(self.session)
        return repo.get(pk=self._work_shift_id)

    def _get_use_case_init(self):
        return CloseWorkShiftUseCaseInit(work_shift=self.__get_work_shift())

    def _save_use_case_result(self, use_case_changed: CloseWorkShiftUseCaseChanged):
        repo = WorkShiftRepository(self.session)
        repo.set_instance(use_case_changed.work_shift)
        repo.update()
