import datetime
from typing import TypedDict

from services.aggregates.base.adapters.base import ResponseEntityAdapter
from services.aggregates.client.entity import Client
from services.aggregates.visit.entity import Visit, StatusChoice


class ClientResponseDict(TypedDict):
    pk: int
    name: str
    last_name: str
    phone: int


class MasterResponseDict(TypedDict):
    pk: int
    name: str
    last_name: str


class VisitResponseDict(TypedDict):
    pk: int
    date: datetime.date
    time_start: datetime.time
    time_end: datetime.time
    master: MasterResponseDict

    duration: int
    either_master: bool
    status: StatusChoice
    comment: str
    paid: int
    discount: int
    card: int
    delete_reason: str


class ClientDetailResponseDict(ClientResponseDict):
    visits: list[VisitResponseDict]


class ResponseClientAdapter(ResponseEntityAdapter):
    @classmethod
    def _get_visits(cls, visits: list[Visit]) -> list[VisitResponseDict]:
        result = []

        for visit in visits:
            result.append(VisitResponseDict(
                pk=visit.pk,
                discount=visit.discount,
                delete_reason=visit.delete_reason,
                duration=visit.duration,
                date=visit.datetime_start.date(),
                time_start=visit.datetime_start.time(),
                time_end=visit.datetime_end.time(),
                either_master=visit.either_master,
                master=MasterResponseDict(pk=visit.master.pk, name=visit.master.name, last_name=visit.master.last_name),
                card=visit.card,
                comment=visit.comment,
                paid=visit.paid,
                status=visit.status
            ))

        return result

    @classmethod
    def detail_from_entity(cls, obj: Client) -> ClientDetailResponseDict:
        return ClientDetailResponseDict(
            pk=obj.pk, name=obj.name, last_name=obj.last_name, phone=obj.phone, visits=cls._get_visits(obj.visits))

    @classmethod
    def from_entity(cls, obj: Client) -> ClientResponseDict:
        return ClientResponseDict(pk=obj.pk, name=obj.name, last_name=obj.last_name, phone=obj.phone)
