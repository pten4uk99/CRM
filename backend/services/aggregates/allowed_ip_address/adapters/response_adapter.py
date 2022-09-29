from typing import TypedDict

from services.aggregates.allowed_ip_address import AllowedIpAddress
from services.aggregates.base.adapters.base import ResponseEntityAdapter


class AllowedIpAddressResponseDict(TypedDict):
    ip: str


class ResponseAllowedIpAddressAdapter(ResponseEntityAdapter):
    @classmethod
    def from_entity(cls, obj: AllowedIpAddress) -> AllowedIpAddressResponseDict:
        return AllowedIpAddressResponseDict(ip=obj.ip)
