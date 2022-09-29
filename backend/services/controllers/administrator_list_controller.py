from services.aggregates.administrator.repository import AdministratorRepository
from services.controllers.base import UseCaseController
from services.use_case.administrator_list_uc import AdministratorListUseCase
from services.use_case.base.uc_init import AdministratorListUseCaseInit


class AdministratorListController(UseCaseController):
    use_case_class = AdministratorListUseCase

    def __get_administrators(self):
        repo = AdministratorRepository(self.session)
        return repo.getlist()

    def _get_use_case_init(self):
        return AdministratorListUseCaseInit(administrators=self.__get_administrators())
