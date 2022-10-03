import datetime
from dataclasses import dataclass
from typing import TypeVar

from services.aggregates.base import Entity

Master = TypeVar('Master', bound=Entity)

@dataclass
class WorkDay(Entity):
    date: datetime.date
    pk: int = None
    masters: list[Master] = None
