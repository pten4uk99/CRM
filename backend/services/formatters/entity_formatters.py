from .base import Formatter
from ..entity import AllowedIpAddress


class AllowedIpAddressFormatter(Formatter):
    def to_dict(self) -> dict:
        self._instance: AllowedIpAddress
        return {
            'pk': self._instance.pk,
            'ip': self._instance.ip,
        }
