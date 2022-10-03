from services.aggregates.master.repository import MasterRepository
from services.controllers.base import UseCaseController
from services.use_case.base.uc_changed import MasterCreateUseCaseChanged
from services.use_case.base.uc_init import MasterCreateUseCaseInit
from services.use_case.master_create_uc import MasterCreateUseCase


class MasterCreateController(UseCaseController):
    use_case_class = MasterCreateUseCase

    def __init__(self, session, name: str, last_name: str):
        super().__init__(session=session)
        self._name = name
        self._last_name = last_name

    def _get_use_case_init(self):
        return MasterCreateUseCaseInit(name=self._name, last_name=self._last_name)

    def _save_use_case_result(self, use_case_changed: MasterCreateUseCaseChanged):
        repo = MasterRepository(session=self.session)
        use_case_changed.master = repo.create(use_case_changed.master)
        return use_case_changed

