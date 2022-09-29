from infrastructure.database.models import AllowedIpAddressDB
from services.aggregates.allowed_ip_address import AllowedIpAddress
from services.aggregates.allowed_ip_address.adapters.model_adapter import AllowedIpAddressAdapter
from services.aggregates.base.repository.base import Repository


class AllowedIpAddressRepository(Repository):
    adapter_class = AllowedIpAddressAdapter

    def _get(self, ip: str):
        result = self.session.query(AllowedIpAddressDB).filter(AllowedIpAddressDB.ip == ip).first()
        return result

    def get(self, *args, **kwargs) -> AllowedIpAddress:
        return super().get(*args, **kwargs)

    def _create(self, adapted_model: AllowedIpAddressDB):
        self.session.add(adapted_model)
        self.session.commit()
