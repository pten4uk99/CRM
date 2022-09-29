import datetime
from dataclasses import dataclass

from services.aggregates.base import Entity


@dataclass
class WorkDay(Entity):
    date: datetime.date
    pk: int = None
    masters: list[Entity] = None
