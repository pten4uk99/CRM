from infrastructure.database.models import ClientDB
from services.aggregates.base.repository.base import Repository
from services.aggregates.client.adapters.model_adapter import ClientAdapter
from services.aggregates.client.entity import Client


class ClientRepository(Repository):
    adapter_class = ClientAdapter
    db_model = ClientDB

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

