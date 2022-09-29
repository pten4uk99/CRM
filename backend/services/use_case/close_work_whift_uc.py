from services.use_case.base import UseCase
from services.use_case.base.uc_changed import CloseWorkShiftUseCaseChanged
from services.use_case.base.uc_init import CloseWorkShiftUseCaseInit
from services.use_case.response.response_core import CloseWorkShiftUseCaseResponse


class CloseWorkShiftUseCase(UseCase):
    _init: CloseWorkShiftUseCaseInit
    response_class = CloseWorkShiftUseCaseResponse

    def __init__(self, init: CloseWorkShiftUseCaseInit):
        super().__init__(init)

    def _perform_run(self):
        self._init.work_shift.is_closed = True
        self.changed_entities = CloseWorkShiftUseCaseChanged(work_shift=self._init.work_shift)
