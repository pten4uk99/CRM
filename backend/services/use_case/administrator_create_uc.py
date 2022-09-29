from services.aggregates.administrator.entity import Administrator
from services.use_case.base import UseCase
from services.use_case.base.uc_changed import AdministratorCreateUseCaseChanged
from services.use_case.base.uc_init import AdministratorCreateUseCaseInit
from services.use_case.response.response_core import AdministratorCreateUseCaseResponse


class AdministratorCreateUseCase(UseCase):
    _init: AdministratorCreateUseCaseInit
    response_class = AdministratorCreateUseCaseResponse

    def __init__(self, init: AdministratorCreateUseCaseInit):
        super().__init__(init)

    def _check_can_create_administrator(self):
        assert self._init.admin_name is not None, 'Не передан при инициализации обязательный атрибут "name"'

    def _create_administrator(self):
        admin = Administrator(name=self._init.admin_name)
        self.changed_entities = AdministratorCreateUseCaseChanged(administrator=admin)

    def _perform_run(self):
        self._check_can_create_administrator()
        self._create_administrator()
