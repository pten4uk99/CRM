import datetime

from services.aggregates.work_day.entity import WorkDay
from services.use_case.base import UseCase
from services.use_case.base.uc_changed import SetMasterTimeTableUseCaseChanged
from services.use_case.base.uc_init import SetMasterTimeTableUseCaseInit
from services.use_case.base.uc_to_delete import SetMasterTimeTableUseCaseToDelete
from services.use_case.response.response_core import MasterCreateUseCaseResponse


class SetMasterTimeTableUseCase(UseCase):
    _init: SetMasterTimeTableUseCaseInit
    response_class = MasterCreateUseCaseResponse

    def __init__(self, init: SetMasterTimeTableUseCaseInit):
        super().__init__(init)

    def _perform_run(self):
        changed = []
        to_delete = []
        new_work_days = []

        for day in self._init.new_work_days:
            date = datetime.date(year=self._init.year, month=self._init.month, day=day)
            work_day = WorkDay(date=date)

            if work_day not in self._init.current_work_days:
                changed.append(work_day)

            new_work_days.append(work_day)

        for work_day in self._init.current_work_days:
            if work_day not in new_work_days:
                to_delete.append(work_day)

        self.changed_entities = SetMasterTimeTableUseCaseChanged(work_days=changed)
        self.entities_to_delete = SetMasterTimeTableUseCaseToDelete(work_days=to_delete)

