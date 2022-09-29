from services.aggregates.allowed_ip_address import AllowedIpAddress
from services.aggregates.base.formatters.base import Formatter


class AllowedIpAddressFormatter(Formatter):
    def to_dict(self) -> dict:
        self._instance: AllowedIpAddress
        return {
            'pk': self._instance.pk,
            'ip': self._instance.ip,
        }
