from typing import TypedDict

from services.adapters.base import ResponseEntityAdapter
from services.entity import AllowedIpAddress


class AllowedIpAddressResponseDict(TypedDict):
    ip: str


class ResponseAllowedIpAddressAdapter(ResponseEntityAdapter):
    @classmethod
    def from_entity(cls, obj: AllowedIpAddress) -> AllowedIpAddressResponseDict:
        return AllowedIpAddressResponseDict(ip=obj.ip)
