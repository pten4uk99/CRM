from infrastructure.database.models import AdministratorDB, MasterWorkDayDB
from services.aggregates.administrator.entity import Administrator
from services.aggregates.base.adapters.base import EntityAdapter
from services.aggregates.master.entity import Master
from services.aggregates.work_day.entity import WorkDay


class WorkDayAdapter(EntityAdapter):
    @classmethod
    def to_entity(cls, obj: MasterWorkDayDB) -> WorkDay:
        return Master(name=obj.name, last_name=obj.last_name)

    @classmethod
    def from_entity(cls, obj: Master) -> MasterDB:
        return MasterDB(name=obj.name, last_name=obj.last_name)
