import datetime
from typing import TypedDict

from services.aggregates.base.adapters.base import ResponseEntityAdapter
from services.aggregates.client.entity import Client
from services.aggregates.master.entity import Master
from services.aggregates.visit.entity import Visit


class ClientResponseDict(TypedDict):
    pk: int
    name: str
    last_name: str
    phone: int
    comment: str


class MasterResponseDict(TypedDict):
    pk: int
    name: str
    last_name: str


class VisitResponseDict(TypedDict):
    pk: int
    time_start: datetime.time
    time_end: datetime.time
    client: ClientResponseDict
    master: MasterResponseDict


class ResponseVisitAdapter(ResponseEntityAdapter):
    @classmethod
    def _get_master_dict(cls, obj: Master) -> MasterResponseDict:
        return MasterResponseDict(
            pk=obj.pk, name=obj.name, last_name=obj.last_name)

    @classmethod
    def _get_client_dict(cls, obj: Client) -> ClientResponseDict:
        return ClientResponseDict(
            pk=obj.pk,
            phone=obj.phone,
            name=obj.name,
            last_name=obj.last_name,
            comment=obj.comment,
        )

    @classmethod
    def from_entity(cls, obj: Visit) -> VisitResponseDict:
        master = None
        client = None

        if obj.master:
            master = cls._get_master_dict(obj.master)
        if obj.client:
            client = cls._get_client_dict(obj.client)

        return VisitResponseDict(
            pk=obj.pk,
            time_start=obj.datetime_start.time(),
            time_end=obj.datetime_end.time(),
            master=master,
            client=client,
        )
