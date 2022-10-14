from services.aggregates.visit.repository import VisitRepository
from services.controllers.base import UseCaseController
from services.use_case.base.uc_init import GetVisitServicesUseCaseInit
from services.use_case.get_visit_services_uc import GetVisitServicesUseCase


class GetVisitServicesController(UseCaseController):
    use_case_class = GetVisitServicesUseCase

    def __init__(self, session, visit_id: int):
        super().__init__(session)

        self._visit_id = visit_id

    def __get_visit_services(self):
        repo = VisitRepository(self.session)
        return repo.get_visit_services(self._visit_id)

    def _get_use_case_init(self):
        return GetVisitServicesUseCaseInit(services=self.__get_visit_services())
