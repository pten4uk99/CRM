from services.use_case.base import UseCase
from services.use_case.base.uc_init import GetTimeTableUseCaseInit
from services.use_case.base.uc_out import GetTimeTableUseCaseOut
from services.use_case.response.response_core import GetTimeTableUseCaseResponse


class GetTimeTableUseCase(UseCase):
    _init: GetTimeTableUseCaseInit
    response_class = GetTimeTableUseCaseResponse

    def __init__(self, init: GetTimeTableUseCaseInit):
        super().__init__(init)

    def _perform_run(self):
        return GetTimeTableUseCaseOut(masters=self._init.masters)
