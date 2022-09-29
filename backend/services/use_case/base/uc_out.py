from dataclasses import dataclass

from services.aggregates.administrator.entity import Administrator
from services.aggregates.allowed_ip_address import AllowedIpAddress
from services.aggregates.master.entity import Master
from services.aggregates.price_list.entity import PriceList
from services.aggregates.visit.entity import Visit


class UseCaseOut:
    """ Базовый класс для результата UseCase """

    pass


@dataclass
class CheckAuthUseCaseOut(UseCaseOut):
    allowed_ip: AllowedIpAddress


@dataclass
class AdministratorListUseCaseOut(UseCaseOut):
    administrators: list[Administrator]


@dataclass
class MasterListUseCaseOut(UseCaseOut):
    masters: list[Master]


@dataclass
class GetTimeTableUseCaseOut(UseCaseOut):
    masters: list[Master]


@dataclass
class GetPriceListUseCaseOut(UseCaseOut):
    price_lists: list[PriceList]


@dataclass
class GetVisitListUseCaseOut(UseCaseOut):
    visits: list[Visit]

if __name__ == '__main__':
    u = CheckAuthUseCaseOut(allowed_ip='dd')
