from dataclasses import dataclass

from services.aggregates.work_day.entity import WorkDay


class UseCaseToDelete:
    """ Базовый класс для списка сущностей, которые подлежат удалению """

    pass


@dataclass
class SetMasterTimeTableToDelete(UseCaseToDelete):
    work_days: list[WorkDay]


@dataclass
class SetMasterTimeTableUseCaseToDelete(UseCaseToDelete):
    work_days: list[WorkDay]
