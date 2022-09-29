from infrastructure.database.models import AdministratorDB
from services.aggregates.administrator.entity import Administrator
from services.aggregates.base.adapters.base import EntityAdapter


class AdministratorAdapter(EntityAdapter):
    @classmethod
    def to_entity(cls, obj: AdministratorDB) -> Administrator:
        return Administrator(pk=obj.pk, name=obj.name)

    @classmethod
    def from_entity(cls, obj: Administrator) -> AdministratorDB:
        return AdministratorDB(name=obj.name)
