from dataclasses import dataclass

from services.aggregates.base import Entity


@dataclass
class Master(Entity):
    name: str
    last_name: str
    pk: int = None
    work_days: list[Entity] = None  # если None в объекте, значит рабочие дни не были запрошены с БД
