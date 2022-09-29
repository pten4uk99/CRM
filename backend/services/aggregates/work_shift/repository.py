from infrastructure.database.models import WorkShiftDB
from services.aggregates.base.repository.base import Repository
from services.aggregates.work_shift.adapters.model_adapter import WorkShiftAdapter


class WorkShiftRepository(Repository):
    adapter_class = WorkShiftAdapter

    def _create(self, adapted_model: WorkShiftDB):
        self.session.add(adapted_model)
        self.session.commit()
