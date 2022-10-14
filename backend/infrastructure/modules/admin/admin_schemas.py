import datetime
from typing import Optional

from pydantic import BaseModel

from services.aggregates.price_item.entity import PriceItemGroup
from services.aggregates.price_list.entity import PriceListType
from services.aggregates.visit.entity import StatusChoice
from services.use_case.base.uc_types import VisitPaymentPriceItemIn


class MasterCreateIn(BaseModel):
    name: str
    last_name: str


class MasterDelete(BaseModel):
    pk: int
    name: str
    last_name: str


class MasterTimeTable(BaseModel):
    pk: int
    name: str
    last_name: str
    work_days: list[int]


class VisitsMaster(BaseModel):
    pk: int
    name: str
    last_name: str


class Client(BaseModel):
    pk: int
    name: str = None
    last_name: str = None
    phone: str


class Visit(BaseModel):
    pk: int
    time_start: datetime.time
    time_end: datetime.time
    duration: int
    either_master: bool
    status: StatusChoice
    client: Optional[Client]
    master: VisitsMaster

    comment: str = None
    paid: int = None
    discount: int = None
    card: int = None
    delete_reason: str = None


class MasterWithVisits(BaseModel):
    master: VisitsMaster
    visits: list[Visit]


class DeleteVisitIn(BaseModel):
    delete_reason: str


class PriceListIn(BaseModel):
    name: str
    type: PriceListType


class OnePriceItemIn(BaseModel):
    name: str
    description: str
    price: int
    price_list_id: int


class ThreePriceItemIn(BaseModel):
    name: str
    description: str
    shirt_price: int
    middle_price: int
    long_price: int
    price_list_id: int


class VisitPaymentIn(BaseModel):
    paid: int
    discount: int = None
    card: int = None
    services: list[VisitPaymentPriceItemIn] = None


class ClientVisit(BaseModel):
    pk: int
    date: datetime.date
    time_start: datetime.time
    time_end: datetime.time
    duration: int
    either_master: bool
    status: StatusChoice
    client: Optional[Client]
    master: VisitsMaster

    comment: str = None
    paid: int = None
    discount: int = None
    card: int = None
    delete_reason: str = None


class ClientDetailOut(BaseModel):
    pk: int
    name: str = None
    last_name: str = None
    phone: str
    visits: list[ClientVisit]


class PriceList(BaseModel):
    pk: int
    name: str
    type: PriceListType


class PriceItem(BaseModel):
    pk: int
    name: str
    price: int
    price_group: PriceItemGroup
    description: str
    price_list: PriceList


class VisitService(BaseModel):
    pk: int
    price_item: PriceItem
    quantity: int
