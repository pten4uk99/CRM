import datetime
from typing import TypedDict

from services.aggregates.base.adapters.base import ResponseEntityAdapter
from services.aggregates.client.entity import Client
from services.aggregates.master.entity import Master
from services.aggregates.price_item.entity import PriceItemGroup, PriceItem
from services.aggregates.price_list.entity import PriceListType
from services.aggregates.visit.entity import Visit
from services.aggregates.visit.value_objects import Service


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
    time_start: datetime.time
    time_end: datetime.time
    client: ClientResponseDict
    master: MasterResponseDict

    duration: int
    either_master: bool
    status: str
    comment: str
    paid: int
    discount: int
    card: int
    delete_reason: str


class MasterWithVisitsResponseDict(TypedDict):
    master: MasterResponseDict
    visits: list[VisitResponseDict]


class PriceListResponseDict(TypedDict):
    pk: int
    name: str
    type: PriceListType


class PriceItemResponseDict(TypedDict):
    pk: int
    name: str
    price: int
    price_group: PriceItemGroup
    price_list: PriceListResponseDict
    description: str


class ServiceResponseDict(TypedDict):
    pk: int
    price_item: PriceItemResponseDict
    quantity: int


class ResponseVisitAdapter(ResponseEntityAdapter):
    @classmethod
    def adapt_service(cls, service: Service) -> ServiceResponseDict:
        price_item: PriceItem = service.price_item
        price_item_dict = PriceItemResponseDict(
            pk=price_item.pk,
            name=price_item.name,
            price_group=price_item.price_group,
            price_list=PriceListResponseDict(
                pk=price_item.price_list.pk, name=price_item.price_list.name, type=price_item.price_list.type),
            price=price_item.price,
            description=price_item.description,
        )
        return ServiceResponseDict(pk=service.pk, price_item=price_item_dict, quantity=service.quantity)

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
        )

    @classmethod
    def from_master_with_visits(cls, obj: Master) -> MasterWithVisitsResponseDict:
        master = cls._get_master_dict(obj)
        visits = []

        for visit in obj.visits:
            visits.append(cls.from_entity(visit))

        return MasterWithVisitsResponseDict(master=master, visits=visits)

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
            card=obj.card,
            comment=obj.comment,
            delete_reason=obj.delete_reason,
            discount=obj.discount,
            duration=obj.duration,
            either_master=obj.either_master,
            paid=obj.paid,
            status=obj.status.name
        )
