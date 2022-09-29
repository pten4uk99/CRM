from services.aggregates.administrator.repository import AdministratorRepository
from services.aggregates.work_shift.repository import WorkShiftRepository
from services.controllers.base import UseCaseController
from services.use_case.base.uc_changed import OpenWorkShiftUseCaseChanged
from services.use_case.base.uc_init import OpenWorkShiftUseCaseInit
from services.use_case.open_work_shift_uc import OpenWorkShiftUseCase


class OpenWorkShiftController(UseCaseController):
    use_case_class = OpenWorkShiftUseCase

    def __init__(self, session, administrator_id: int):
        super().__init__(session=session)

        self._administrator_id = administrator_id

    def __get_administrator(self):
        repo = AdministratorRepository(self.session)
        return repo.get(pk=self._administrator_id)

    def _get_use_case_init(self):
        return OpenWorkShiftUseCaseInit(administrator=self.__get_administrator())

    def _save_use_case_result(self, use_case_changed: OpenWorkShiftUseCaseChanged):
        repo = WorkShiftRepository(self.session)
        repo.create(use_case_changed.work_shift)
