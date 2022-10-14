from dataclasses import dataclass

from services.aggregates.administrator.entity import Administrator
from services.aggregates.allowed_ip_address import AllowedIpAddress
from services.aggregates.client.entity import Client
from services.aggregates.master.entity import Master
from services.aggregates.price_list.entity import PriceList
from services.aggregates.visit.entity import Visit
from services.aggregates.visit.value_objects import Service


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
    masters_with_visits: list[Master]


@dataclass
class GetClientListUseCaseOut(UseCaseOut):
    clients: list[Client]


@dataclass
class ClientDetailUseCaseOut(UseCaseOut):
    client: Client


@dataclass
class GetVisitServicesUseCaseOut(UseCaseOut):
    services: list[Service]


if __name__ == '__main__':
    u = CheckAuthUseCaseOut(allowed_ip='dd')
