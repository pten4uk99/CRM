import datetime

from services.aggregates.work_shift.entity import WorkShift
from services.use_case.base import UseCase
from services.use_case.base.uc_changed import OpenWorkShiftUseCaseChanged
from services.use_case.base.uc_init import OpenWorkShiftUseCaseInit
from services.use_case.response.response_core import OpenWorkShiftUseCaseResponse


class OpenWorkShiftUseCase(UseCase):
    _init: OpenWorkShiftUseCaseInit
    response_class = OpenWorkShiftUseCaseResponse

    def __init__(self, init: OpenWorkShiftUseCaseInit):
        super().__init__(init)

    def _perform_run(self):
        work_shift = WorkShift(
            administrator=self._init.administrator,
            datetime=datetime.datetime.now(),
            is_closed=False
        )
        self.changed_entities = OpenWorkShiftUseCaseChanged(work_shift=work_shift)
