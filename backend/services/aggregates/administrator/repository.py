from infrastructure.database.models import AdministratorDB
from services.aggregates.administrator.adapters.model_adapter import AdministratorAdapter
from services.aggregates.base.repository.base import Repository


class AdministratorRepository(Repository):
    adapter_class = AdministratorAdapter

    def _getlist(self, *args, **kwargs) -> list[AdministratorDB]:
        result = self.session.query(AdministratorDB).all()
        return result

    def getlist(self, *args, **kwargs) -> list[AdministratorDB]:
        return super().getlist(*args, **kwargs)

    def _get(self, pk: int) -> AdministratorDB:
        return self.session.query(AdministratorDB).get(pk)

    def _create(self, adapted_model: AdministratorDB):
        self.session.add(adapted_model)
        self.session.commit()
