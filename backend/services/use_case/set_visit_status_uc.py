from services.use_case.base import UseCase
from services.use_case.base.uc_changed import SetVisitStatusUseCaseChanged
from services.use_case.base.uc_init import SetVisitStatusUseCaseInit
from services.use_case.response.response_core import SetVisitStatusUseCaseResponse


class SetVisitStatusUseCase(UseCase):
    _init: SetVisitStatusUseCaseInit
    response_class = SetVisitStatusUseCaseResponse

    def __init__(self, init: SetVisitStatusUseCaseInit):
        super().__init__(init)

    def _perform_run(self):
        self._init.visit.status = self._init.status
        self.changed_entities = SetVisitStatusUseCaseChanged(self._init.visit)
