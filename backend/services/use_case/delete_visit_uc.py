from services.use_case.base import UseCase, UseCaseException
from services.use_case.base.uc_changed import DeleteVisitUseCaseChanged
from services.use_case.base.uc_init import DeleteVisitUseCaseInit
from services.use_case.response.response_core import SetVisitStatusUseCaseResponse


class DeleteVisitUseCase(UseCase):
    _init: DeleteVisitUseCaseInit
    response_class = SetVisitStatusUseCaseResponse

    def __init__(self, init: DeleteVisitUseCaseInit):
        super().__init__(init)

    def _perform_run(self):
        if not self._init.delete_reason:
            raise UseCaseException('Нужно указать причину удаления визита')

        self._init.visit.delete_reason = self._init.delete_reason
        self.changed_entities = DeleteVisitUseCaseChanged(self._init.visit)
