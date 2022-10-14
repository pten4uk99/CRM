from infrastructure.database.models import ClientDB, VisitDB, MasterDB
from services.aggregates.base.adapters.base import EntityAdapter
from services.aggregates.client.entity import Client
from services.aggregates.master.entity import Master
from services.aggregates.visit.entity import Visit, StatusChoice


class ClientAdapter(EntityAdapter):
    @classmethod
    def _get_master(cls, master_db: MasterDB) -> Master:
        return Master(
            pk=master_db.pk,
            name=master_db.name,
            last_name=master_db.last_name,
        )

    @classmethod
    def _get_visits(cls, visits_db: list[VisitDB]) -> list[Visit]:
        result = []
        for visit in visits_db:
            result.append(Visit(
                pk=visit.pk,
                datetime_start=visit.datetime_start,
                datetime_end=visit.datetime_end,
                either_master=visit.either_master,
                status=getattr(StatusChoice, visit.status),
                delete_reason=visit.delete_reason,
                paid=visit.paid,
                discount=visit.discount,
                card=visit.card,
                master=cls._get_master(visit.master),
                comment=visit.comment
            ))

        return result

    @classmethod
    def to_entity(cls, obj: ClientDB) -> Client:
        return Client(
            pk=obj.pk,
            name=obj.name,
            last_name=obj.last_name,
            phone=obj.phone,
            visits=cls._get_visits(obj.visits)
        )

    @classmethod
    def from_entity(cls, obj: Client) -> ClientDB:
        return ClientDB(
            pk=obj.pk,
            name=obj.name,
            last_name=obj.last_name,
            phone=obj.phone,
        )
