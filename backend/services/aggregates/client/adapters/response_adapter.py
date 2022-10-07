from typing import TypedDict

from services.aggregates.base.adapters.base import ResponseEntityAdapter
from services.aggregates.client.entity import Client


class ClientResponseDict(TypedDict):
    pk: int
    name: str
    last_name: str
    phone: int


class ResponseClientAdapter(ResponseEntityAdapter):
    @classmethod
    def from_entity(cls, obj: Client) -> ClientResponseDict:
        return ClientResponseDict(pk=obj.pk, name=obj.name, last_name=obj.last_name, phone=obj.phone)
