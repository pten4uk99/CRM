from services.use_case.base import UseCase
from services.use_case.base.uc_init import MasterListUseCaseInit
from services.use_case.base.uc_out import MasterListUseCaseOut
from services.use_case.response.response_core import MasterListUseCaseResponse


class MasterListUseCase(UseCase):
    _init: MasterListUseCaseInit
    response_class = MasterListUseCaseResponse

    def __init__(self, init: MasterListUseCaseInit):
        super().__init__(init)

    def _perform_run(self):
        return MasterListUseCaseOut(masters=self._init.masters)
