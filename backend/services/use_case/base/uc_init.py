import datetime
from dataclasses import dataclass

from services.aggregates.administrator.entity import Administrator
from services.aggregates.allowed_ip_address.entity import AllowedIpAddress
from services.aggregates.client.entity import Client
from services.aggregates.master.entity import Master
from services.aggregates.price_list.entity import PriceList, PriceListType
from services.aggregates.visit.entity import Visit, StatusChoice
from services.aggregates.work_day.entity import WorkDay
from services.aggregates.work_shift.entity import WorkShift
from services.use_case.base.uc_types import VisitPaymentPriceItemIn, VisitPaymentService


class UseCaseInit:
    """ Базовый класс для аргументов инициализации UseCase """

    pass


@dataclass
class CheckAuthUseCaseInit(UseCaseInit):
    allowed_ip: AllowedIpAddress


@dataclass
class NewBrowserUseCaseInit(UseCaseInit):
    ip: str
    password: str


@dataclass
class AdministratorCreateUseCaseInit(UseCaseInit):
    admin_name: str


@dataclass
class AdministratorListUseCaseInit(UseCaseInit):
    administrators: list[Administrator]


@dataclass
class MasterCreateUseCaseInit(UseCaseInit):
    name: str
    last_name: str


@dataclass
class MasterDeleteUseCaseInit(UseCaseInit):
    master: Master


@dataclass
class MasterListUseCaseInit(UseCaseInit):
    masters: list[Master]


@dataclass
class SetMasterTimeTableUseCaseInit(UseCaseInit):
    year: int
    month: int
    current_work_days: list[WorkDay]
    new_work_days: list[int]


@dataclass
class GetTimeTableUseCaseInit(UseCaseInit):
    masters: list[Master]


@dataclass
class AddOnePriceItemUseCaseInit(UseCaseInit):
    name: str
    description: str
    price: int
    price_list: PriceList


@dataclass
class AddThreePriceItemUseCaseInit(UseCaseInit):
    name: str
    description: str
    shirt_price: int
    middle_price: int
    long_price: int
    price_list: PriceList


@dataclass
class GetPriceListUseCaseInit(UseCaseInit):
    price_lists: list[PriceList]


@dataclass
class AddPriceListUseCaseInit(UseCaseInit):
    name: str
    type: PriceListType
    existing_price_list: PriceList


@dataclass
class OpenWorkShiftUseCaseInit(UseCaseInit):
    administrator: Administrator


@dataclass
class CloseWorkShiftUseCaseInit(UseCaseInit):
    work_shift: WorkShift


@dataclass
class NewVisitUseCaseInit(UseCaseInit):
    day_visits: list[Visit]
    datetime_start: datetime.datetime
    datetime_end: datetime.datetime
    either_master: bool
    existing_client: Client = None
    phone: str = None
    name: str = None
    last_name: str = None
    comment: str = None
    client: Client = None
    master: Master = None


@dataclass
class EditVisitUseCaseInit(UseCaseInit):
    day_visits: list[Visit]
    old_visit: Visit
    existing_client: Client = None
    datetime_start: datetime.datetime = None
    datetime_end: datetime.datetime = None
    either_master: bool = None
    paid: int = None
    discount: int = None
    card: int = None
    phone: str = None
    name: str = None
    last_name: str = None
    comment: str = None
    master: Master = None
    client: Client = None


@dataclass
class GetVisitListUseCaseInit(UseCaseInit):
    date: datetime.date
    masters_with_visits: list[Master]


@dataclass
class GetClientListUseCaseInit(UseCaseInit):
    clients: list[Client]


@dataclass
class SetVisitStatusUseCaseInit(UseCaseInit):
    visit: Visit
    status: StatusChoice


@dataclass
class DeleteVisitUseCaseInit(UseCaseInit):
    visit: Visit
    delete_reason: str


@dataclass
class ClientDetailUseCaseInit(UseCaseInit):
    client: Client


@dataclass
class VisitPaymentUseCaseInit(UseCaseInit):
    visit: Visit
    paid: int
    discount: int
    card: int
    services: list[VisitPaymentService]


if __name__ == '__main__':
    u = CheckAuthUseCaseInit(allowed_ip='dd')
