from services.aggregates.administrator.repository import AdministratorRepository
from services.controllers.base import UseCaseController
from services.use_case.administrator_create_uc import AdministratorCreateUseCase
from services.use_case.base.uc_changed import AdministratorCreateUseCaseChanged
from services.use_case.base.uc_init import AdministratorCreateUseCaseInit


class AdministratorCreateController(UseCaseController):
    use_case_class = AdministratorCreateUseCase

    def __init__(self, session, admin_name: str):
        super().__init__(session=session)
        self._admin_name = admin_name

    def _get_use_case_init(self):
        return AdministratorCreateUseCaseInit(admin_name=self._admin_name)

    def _save_use_case_result(self, use_case_changed: AdministratorCreateUseCaseChanged):
        repo = AdministratorRepository(session=self.session)
        repo.create(use_case_changed.administrator)
