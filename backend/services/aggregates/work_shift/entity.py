import datetime
from dataclasses import dataclass

from services.aggregates.base import Entity


@dataclass
class WorkShift(Entity):
    datetime: datetime.datetime
    is_closed: bool
    pk: int = None
    administrator: Entity = None
