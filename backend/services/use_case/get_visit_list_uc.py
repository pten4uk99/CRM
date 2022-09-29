from services.use_case.base import UseCase
from services.use_case.base.uc_init import GetVisitListUseCaseInit
from services.use_case.base.uc_out import GetVisitListUseCaseOut
from services.use_case.response.response_core import GetVisitListUseCaseResponse


class GetVisitListUseCase(UseCase):
    _init: GetVisitListUseCaseInit
    response_class = GetVisitListUseCaseResponse

    def __init__(self, init: GetVisitListUseCaseInit):
        super().__init__(init)

    def _perform_run(self):
        return GetVisitListUseCaseOut(visits=self._init.visits)
