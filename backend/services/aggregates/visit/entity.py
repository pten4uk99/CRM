import datetime
from dataclasses import dataclass
from enum import Enum
from typing import TypeVar

from services.aggregates.base import Entity

Client = TypeVar('Client', bound=Entity)
Master = TypeVar('Master', bound=Entity)
WorkShift = TypeVar('WorkShift', bound=Entity)
Service = TypeVar('Service', bound=Entity)


class StatusChoice(Enum):
    completed = 'completed'
    confirmed = 'confirmed'
    need_confirm = 'need_confirm'


@dataclass
class Visit(Entity):
    datetime_start: datetime.datetime
    datetime_end: datetime.datetime
    status: StatusChoice

    pk: int = None
    delete_reason: str = None
    services: list[Service] = None
    client: Client = None
    master: Master = None
    work_shift: WorkShift = None

    paid: int = None
    discount: int = None
    card: int = None
