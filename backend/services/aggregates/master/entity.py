from dataclasses import dataclass
from typing import TypeVar

from services.aggregates.base import Entity

WorkDay = TypeVar('WorkDay', bound=Entity)
Visit = TypeVar('Visit', bound=Entity)


@dataclass
class Master(Entity):
    name: str
    last_name: str
    pk: int = None
    work_days: list[WorkDay] = None  # если None в объекте, значит рабочие дни не были запрошены с БД
    visits: list[Visit] = None
