import datetime
from dataclasses import dataclass

from services.aggregates.administrator.entity import Administrator
from services.aggregates.allowed_ip_address.entity import AllowedIpAddress
from services.aggregates.client.entity import Client
from services.aggregates.master.entity import Master
from services.aggregates.price_list.entity import PriceList
from services.aggregates.visit.entity import Visit
from services.aggregates.work_day.entity import WorkDay
from services.aggregates.work_shift.entity import WorkShift


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
    price_list_id: int


@dataclass
class AddThreePriceItemUseCaseInit(UseCaseInit):
    name: str
    description: str
    shirt_price: int
    middle_price: int
    long_price: int
    price_list_id: int


@dataclass
class GetPriceListUseCaseInit(UseCaseInit):
    price_lists: list[PriceList]


@dataclass
class AddPriceListUseCaseInit(UseCaseInit):
    name: str


@dataclass
class OpenWorkShiftUseCaseInit(UseCaseInit):
    administrator: Administrator


@dataclass
class CloseWorkShiftUseCaseInit(UseCaseInit):
    work_shift: WorkShift


@dataclass
class NewVisitUseCaseInit(UseCaseInit):
    datetime_start: datetime.datetime
    datetime_end: datetime.datetime
    phone: int = None
    name: str = None
    last_name: str = None
    comment: str = None
    client: Client = None
    master: Master = None


@dataclass
class GetVisitListUseCaseInit(UseCaseInit):
    visits: list[Visit]


if __name__ == '__main__':
    u = CheckAuthUseCaseInit(allowed_ip='dd')
