from dataclasses import dataclass
from typing import Optional

from services.aggregates.administrator.entity import Administrator
from services.aggregates.allowed_ip_address import AllowedIpAddress
from services.aggregates.client.entity import Client
from services.aggregates.master.entity import Master
from services.aggregates.price_item.entity import OnePriceItem, ThreePriceItem
from services.aggregates.price_list.entity import PriceList
from services.aggregates.visit.entity import Visit
from services.aggregates.work_day.entity import WorkDay
from services.aggregates.work_shift.entity import WorkShift


class UseCaseChanged:
    """ Базовый класс для результата UseCase """

    pass


@dataclass
class CheckAuthUseCaseChanged(UseCaseChanged):
    allowed_ip: AllowedIpAddress


@dataclass
class NewBrowserUseCaseChanged(UseCaseChanged):
    allowed_ip: AllowedIpAddress


@dataclass
class AdministratorCreateUseCaseChanged(UseCaseChanged):
    administrator: Administrator


@dataclass
class MasterCreateUseCaseChanged(UseCaseChanged):
    master: Master


@dataclass
class SetMasterTimeTableUseCaseChanged(UseCaseChanged):
    work_days: list[WorkDay]


@dataclass
class AddOnePriceItemUseCaseChanged(UseCaseChanged):
    one_price_item: OnePriceItem


@dataclass
class AddThreePriceItemUseCaseChanged(UseCaseChanged):
    three_price_item: ThreePriceItem


@dataclass
class AddPriceListUseCaseChanged(UseCaseChanged):
    price_list: PriceList


@dataclass
class OpenWorkShiftUseCaseChanged(UseCaseChanged):
    work_shift: WorkShift


@dataclass
class CloseWorkShiftUseCaseChanged(UseCaseChanged):
    work_shift: WorkShift


@dataclass
class NewVisitUseCaseChanged(UseCaseChanged):
    visit: Optional[Visit] = None
    client: Optional[Client] = None


@dataclass
class EditVisitUseCaseChanged(UseCaseChanged):
    visit: Optional[Visit] = None


@dataclass
class SetVisitStatusUseCaseChanged(UseCaseChanged):
    visit: Visit


@dataclass
class DeleteVisitUseCaseChanged(UseCaseChanged):
    visit: Visit


if __name__ == '__main__':
    u = CheckAuthUseCaseChanged(allowed_ip='dd')
