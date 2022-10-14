import datetime

from sqlalchemy import and_, desc

from infrastructure.database.models import VisitDB, ClientDB, ServiceDB
from services.aggregates.base.repository.base import Repository
from services.aggregates.client.entity import Client
from services.aggregates.visit.adapters.model_adapter import VisitAdapter
from services.aggregates.visit.entity import Visit
from services.aggregates.visit.value_objects import Service


class VisitRepository(Repository):
    adapter_class = VisitAdapter
    db_model = VisitDB

    def get_by_client_id(self, client_id: int) -> list[Visit]:
        query = self.session.query(VisitDB).filter(VisitDB.client_id == client_id).order_by(desc(VisitDB.datetime_start))
        visits_db: list[VisitDB] = query.all()
        visits = []

        for visit_db in visits_db:
            visits.append(self.adapter_class.to_entity(visit_db))

        return visits

    def get_visit_services(self, visit_id: int) -> list[Service]:
        visit_db: VisitDB = self.session.query(VisitDB).filter(VisitDB.pk == visit_id).first()
        services = self.adapter_class.adapt_visit_services(visit_db.services)
        return services

    def _create_client(self, name, last_name, phone):
        client = ClientDB(name=name, last_name=last_name, phone=phone)
        self.session.add(client)
        self.session.commit()
        return client

    def _add_client(self, client: Client):
        assert self._instance_db is not None, 'Сначала нужно вызвать "set_instanse"'
        instance: VisitDB = self._instance_db

        if client.pk is not None:
            instance.client_id = client.pk
        else:
            client = self._create_client(client.name, client.last_name, client.phone)
            instance.client_id = client.pk

        self.session.add(instance)
        self.session.commit()

    def _create_service(self, service: Service, visit_id: int):
        service_db: ServiceDB = self.session.query(ServiceDB).filter(and_(
            ServiceDB.visit_id == visit_id,
            ServiceDB.price_item_id == service.price_item.pk
        )).first()

        if not service_db:
            service_db = ServiceDB(
                quantity=service.quantity,
                visit_id=visit_id,
                price_item_id=service.price_item.pk
            )
        else:
            service_db.quantity += service.quantity

        self.session.add(service_db)

    def _update(self, new_entity: Visit):
        instance: VisitDB = self._instance_db

        if new_entity.client is not None:
            self._add_client(new_entity.client)
        if new_entity.services:
            for service in new_entity.services:
                self._create_service(service, instance.pk)

        instance.master_id = new_entity.master.pk
        instance.card = new_entity.card
        instance.paid = new_entity.paid
        instance.discount = new_entity.discount
        instance.status = new_entity.status.name
        instance.datetime_start = new_entity.datetime_start
        instance.datetime_end = new_entity.datetime_end
        instance.either_master = new_entity.either_master
        instance.comment = new_entity.comment
        instance.delete_reason = new_entity.delete_reason

        self.session.add(instance)
        self.session.commit()

    def _get(self, pk: int) -> VisitDB:
        visit = self.session.query(VisitDB).filter(VisitDB.pk == pk).first()
        return visit

    def _getlist(self, date: datetime.date) -> list[VisitDB]:
        dt_start = datetime.datetime(date.year, date.month, date.day, 0, 0)
        dt_end = datetime.datetime(date.year, date.month, date.day, 23, 59)

        visits = self.session.query(VisitDB).filter(and_(
            VisitDB.datetime_start >= dt_start,
            VisitDB.datetime_end <= dt_end,
            VisitDB.delete_reason == None,
        )).all()

        return visits

    def _create(self, adapted_model: VisitDB):
        self.session.add(adapted_model)
        self.session.commit()
