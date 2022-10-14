from services.use_case.base import UseCase
from services.use_case.base.uc_init import GetVisitServicesUseCaseInit
from services.use_case.base.uc_out import GetVisitServicesUseCaseOut
from services.use_case.response.response_core import GetVisitServicesUseCaseResponse


class GetVisitServicesUseCase(UseCase):
    _init: GetVisitServicesUseCaseInit
    response_class = GetVisitServicesUseCaseResponse

    def __init__(self, init: GetVisitServicesUseCaseInit):
        super().__init__(init)

    def _perform_run(self):
        return GetVisitServicesUseCaseOut(services=self._init.services)
