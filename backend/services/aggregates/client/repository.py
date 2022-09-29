from infrastructure.database.models import ClientDB
from services.aggregates.base.repository.base import Repository
from services.aggregates.client.adapters.model_adapter import ClientAdapter


class ClientRepository(Repository):
    adapter_class = ClientAdapter

    def _create(self, adapted_model: ClientDB):
        self.session.add(adapted_model)
        self.session.commit()

