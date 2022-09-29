from infrastructure.database.models import ClientDB
from services.aggregates.base.adapters.base import EntityAdapter
from services.aggregates.client.entity import Client


class ClientAdapter(EntityAdapter):
    @classmethod
    def to_entity(cls, obj: ClientDB) -> Client:
        return Client(pk=obj.pk, name=obj.name, last_name=obj.last_name, comment=obj.comment)

    @classmethod
    def from_entity(cls, obj: Client) -> ClientDB:
        return ClientDB(pk=obj.pk, name=obj.name, last_name=obj.last_name)
