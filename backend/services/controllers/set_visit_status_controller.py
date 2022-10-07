from services.aggregates.visit.entity import StatusChoice
from services.aggregates.visit.repository import VisitRepository
from services.controllers.base import UseCaseController
from services.use_case.base.uc_changed import SetVisitStatusUseCaseChanged
from services.use_case.base.uc_init import SetVisitStatusUseCaseInit
from services.use_case.set_visit_status_uc import SetVisitStatusUseCase


class SetVisitStatusController(UseCaseController):
    use_case_class = SetVisitStatusUseCase

    def __init__(self, session, visit_id: int, status: StatusChoice):
        super().__init__(session)

        self._visit_id = visit_id
        self._status = status

    def __get_visit(self):
        repo = VisitRepository(self.session)
        return repo.get(self._visit_id)

    def _get_use_case_init(self):
        return SetVisitStatusUseCaseInit(visit=self.__get_visit(), status=self._status)

    def _save_use_case_result(self, use_case_changed: SetVisitStatusUseCaseChanged) -> SetVisitStatusUseCaseChanged:
        repo = VisitRepository(self.session)
        repo.set_instance(use_case_changed.visit)
        repo.update(use_case_changed.visit)
        return use_case_changed
