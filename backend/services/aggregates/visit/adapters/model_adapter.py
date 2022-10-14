from infrastructure.database.models import VisitDB, ClientDB, MasterDB, ServiceDB, PriceItemDB, PriceListDB
from services.aggregates.base.adapters.base import EntityAdapter
from services.aggregates.client.entity import Client
from services.aggregates.master.entity import Master
from services.aggregates.price_item.entity import PriceItem, PriceItemGroup
from services.aggregates.price_list.entity import PriceList, PriceListType
from services.aggregates.visit.entity import Visit, StatusChoice
from services.aggregates.visit.value_objects import Service


class VisitAdapter(EntityAdapter):
    @classmethod
    def _adapt_price_list(cls, price_list: PriceListDB) -> PriceList:
        return PriceList(pk=price_list.pk, name=price_list.name, type=getattr(PriceListType, price_list.type))

    @classmethod
    def _adapt_price_item(cls, price_item: PriceItemDB) -> PriceItem:
        return PriceItem(
            pk=price_item.pk,
            name=price_item.name,
            price_list=cls._adapt_price_list(price_item.price_list),
            description=price_item.description,
            price_group=getattr(PriceItemGroup, price_item.price_group),
            price=price_item.price,
        )

    @classmethod
    def adapt_visit_services(cls, services: list[ServiceDB]) -> list[Service]:
        result = []
        for service in services:
            result.append(Service(
                pk=service.pk,
                quantity=service.quantity,
                price_item=cls._adapt_price_item(service.price_item)
            ))

        return result

    @classmethod
    def _get_client(cls, obj: ClientDB) -> Client:
        return Client(
            pk=obj.pk,
            name=obj.name,
            last_name=obj.last_name,
            phone=obj.phone,
        )

    @classmethod
    def _get_master(cls, obj: MasterDB) -> Master:
        return Master(
            pk=obj.pk,
            name=obj.name,
            last_name=obj.last_name,
        )

    @classmethod
    def to_entity(cls, obj: VisitDB) -> Visit:
        client = None
        master = None

        if obj.client:
            client = cls._get_client(obj.client)
        if obj.master:
            master = cls._get_master(obj.master)

        return Visit(
            pk=obj.pk,
            datetime_start=obj.datetime_start,
            datetime_end=obj.datetime_end,
            status=getattr(StatusChoice, obj.status),
            either_master=obj.either_master,
            client=client,
            delete_reason=obj.delete_reason,
            master=master,
            paid=obj.paid,
            discount=obj.discount,
            card=obj.card,
            comment=obj.comment,
        )

    @classmethod
    def from_entity(cls, obj: Visit):
        client_id = obj.client.pk if obj.client else None

        return VisitDB(
            pk=obj.pk,
            datetime_start=obj.datetime_start,
            datetime_end=obj.datetime_end,
            either_master=obj.either_master,
            client_id=client_id,
            master_id=obj.master.pk,
            status=obj.status.name,
            delete_reason=obj.delete_reason,
            paid=obj.paid,
            discount=obj.discount,
            card=obj.card,
            comment=obj.comment,
        )
