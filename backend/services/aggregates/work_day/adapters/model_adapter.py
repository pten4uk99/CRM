from infrastructure.database.models import WorkDayDB, MasterWorkDayDB, VisitDB, MasterDB, ClientDB
from services.aggregates.base.adapters.base import EntityAdapter
from services.aggregates.client.entity import Client
from services.aggregates.master.entity import Master
from services.aggregates.visit.entity import Visit, StatusChoice
from services.aggregates.work_day.entity import WorkDay


class WorkDayAdapter(EntityAdapter):
    @classmethod
    def _get_master(cls, master: MasterDB) -> Master:
        return Master(pk=master.pk, name=master.name, last_name=master.last_name)

    @classmethod
    def _get_client(cls, client: ClientDB) -> Client:
        return Client(
            pk=client.pk,
            name=client.name,
            last_name=client.last_name,
            phone=client.phone,
        )

    @classmethod
    def _get_master_visits(cls, visits_db: list[VisitDB]) -> list[Visit]:
        visits = []

        for visit in visits_db:
            client = cls._get_client(visit.client) if visit.client else None

            visits.append(Visit(
                pk=visit.pk,
                datetime_start=visit.datetime_start,
                datetime_end=visit.datetime_end,
                either_master=visit.either_master,
                master=cls._get_master(visit.master),
                client=client,
                comment=visit.comment,
                status=getattr(StatusChoice, visit.status),
                delete_reason=visit.delete_reason,
                paid=visit.paid,
                discount=visit.discount,
                card=visit.card,
            ))

        return visits

    @classmethod
    def _get_masters(cls, master_work_days: list[MasterWorkDayDB]) -> list[Master]:
        masters = []

        for master_work_day in master_work_days:
            master = master_work_day.master
            masters.append(Master(
                pk=master.pk,
                name=master.name,
                last_name=master.last_name,
                visits=cls._get_master_visits(master.visits)
            ))

        return masters

    @classmethod
    def to_entity(cls, obj: WorkDayDB) -> WorkDay:
        masters = None

        if obj.masters:
            masters = cls._get_masters(obj.masters)

        return WorkDay(pk=obj.pk, date=obj.date, masters=masters)

    @classmethod
    def from_entity(cls, obj: WorkDay) -> WorkDayDB:
        return WorkDayDB(pk=obj.pk, date=obj.date)
