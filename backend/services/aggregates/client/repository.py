from infrastructure.database.models import ClientDB
from services.aggregates.base.repository.base import Repository
from services.aggregates.client.adapters.model_adapter import ClientAdapter
from services.aggregates.client.entity import Client


class ClientRepository(Repository):
    adapter_class = ClientAdapter
    db_model = ClientDB

    def get_by_phone(self, phone: int):
        return self.session.query(ClientDB).filter(ClientDB.phone == phone).first()

    def _get(self, pk: int):
        client = self.session.query(ClientDB).get(pk)
        return client

    def _getlist(self, name: str = None, last_name: str = None, phone: int = None):
        query = self.session.query(ClientDB)
        if name is not None:
            query = query.filter(ClientDB.name.like(f'%{name}%'))
        if last_name is not None:
            query = query.filter(ClientDB.last_name.like(f'%{last_name}%'))
        if phone is not None:
            query = query.filter(ClientDB.phone.like(f'%{phone}%'))

        clients = query.all()
        return clients

    def create_or_update(self, client: Client):
        if client.pk is not None:
            client_db = self.session.query(ClientDB).filter(ClientDB.pk == client.pk).first()

            client_db.phone = client.phone
            client_db.name = client.name
            client_db.last_name = client.last_name
        else:
            client_db = self.adapter_class.from_entity(client)

        self.session.add(client_db)
        self.session.commit()

        return client_db

    def get_or_create(self, client: Client):
        client_db = self.session.query(ClientDB).filter(ClientDB.phone == client.phone).first()

        if not client_db:
            client_db = self.adapter_class.from_entity(client)
            self.session.add(client_db)
            self.session.commit()

        return self.adapter_class.to_entity(client_db)

    def _create(self, adapted_model: ClientDB):
        self.session.add(adapted_model)
        self.session.commit()
