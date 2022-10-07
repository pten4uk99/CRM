from services.aggregates.visit.repository import VisitRepository
from services.controllers.base import UseCaseController
from services.use_case.base.uc_changed import DeleteVisitUseCaseChanged
from services.use_case.base.uc_init import DeleteVisitUseCaseInit
from services.use_case.delete_visit_uc import DeleteVisitUseCase


class DeleteVisitController(UseCaseController):
    use_case_class = DeleteVisitUseCase

    def __init__(self, session, visit_id: int, delete_reason: str):
        super().__init__(session)

        self._visit_id = visit_id
        self._delete_reason = delete_reason

    def __get_visit(self):
        repo = VisitRepository(self.session)
        return repo.get(self._visit_id)

    def _get_use_case_init(self):
        return DeleteVisitUseCaseInit(visit=self.__get_visit(), delete_reason=self._delete_reason)

    def _save_use_case_result(self, use_case_changed: DeleteVisitUseCaseChanged) -> DeleteVisitUseCaseChanged:
        repo = VisitRepository(self.session)
        repo.set_instance(use_case_changed.visit)
        repo.update(use_case_changed.visit)
        return use_case_changed
