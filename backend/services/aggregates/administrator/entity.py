from dataclasses import dataclass

from services.aggregates.base import Entity


@dataclass
class Administrator(Entity):
    name: str
    pk: int = None
    work_shifts: list[Entity] = None  # если None в объекте, значит смены не были запрошены с БД
