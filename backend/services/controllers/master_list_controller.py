from services.aggregates.master.repository import MasterRepository
from services.controllers.base import UseCaseController
from services.use_case.base.uc_init import MasterListUseCaseInit
from services.use_case.master_list_uc import MasterListUseCase


class MasterListController(UseCaseController):
    use_case_class = MasterListUseCase

    def __get_masters(self):
        repo = MasterRepository(self.session)
        return repo.getlist()

    def _get_use_case_init(self):
        return MasterListUseCaseInit(masters=self.__get_masters())
