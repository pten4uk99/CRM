from infrastructure.database.models import MasterDB, WorkDayDB, MasterWorkDayDB
from services.aggregates.base.adapters.base import EntityAdapter
from services.aggregates.master.entity import Master
from services.aggregates.work_day.entity import WorkDay


class MasterAdapter(EntityAdapter):

    @classmethod
    def adapt_work_day_to_model(cls, work_day: WorkDay) -> WorkDayDB:
        return WorkDayDB(
            pk=work_day.pk,
            date=work_day.date
        )

    @classmethod
    def adapt_model_to_work_day(cls, obj: WorkDayDB) -> WorkDay:
        return WorkDay(
            pk=obj.pk,
            date=obj.date
        )

    @classmethod
    def adapt_master_work_day_model_to_work_day(cls, obj: MasterWorkDayDB) -> WorkDay:
        return WorkDay(date=obj.work_day.date)

    @classmethod
    def to_entity(cls, obj: MasterDB) -> Master:
        return Master(pk=obj.pk, name=obj.name, last_name=obj.last_name, work_days=obj.work_days)

    @classmethod
    def from_entity(cls, obj: Master) -> MasterDB:
        return MasterDB(pk=obj.pk, name=obj.name, last_name=obj.last_name)
