from infrastructure.database.models import WorkShiftDB
from services.aggregates.base.adapters.base import EntityAdapter
from services.aggregates.work_shift.entity import WorkShift


class WorkShiftAdapter(EntityAdapter):
    @classmethod
    def to_entity(cls, obj: WorkShiftDB) -> WorkShift:
        pass

    @classmethod
    def from_entity(cls, obj: WorkShift) -> WorkShiftDB:
        return WorkShiftDB(
            pk=obj.pk,
            administrator_id=obj.administrator.pk,
            datetime=obj.datetime,
            is_closed=obj.is_closed
        )
