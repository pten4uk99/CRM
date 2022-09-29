from infrastructure.database.models import AllowedIpAddressDB
from services.aggregates.allowed_ip_address import AllowedIpAddress
from services.aggregates.base.adapters.base import EntityAdapter


class AllowedIpAddressAdapter(EntityAdapter):
    @classmethod
    def to_entity(cls, obj: AllowedIpAddressDB) -> AllowedIpAddress:
        return AllowedIpAddress(pk=obj.pk, ip=obj.ip)

    @classmethod
    def from_entity(cls, obj: AllowedIpAddress):
        return AllowedIpAddressDB(ip=obj.ip)
