from typing import TypedDict

from services.aggregates.base.adapters.base import ResponseEntityAdapter
from services.aggregates.master.entity import Master
from services.aggregates.work_day.entity import WorkDay


class MasterResponseDict(TypedDict):
    pk: int
    name: str
    last_name: str


class MasterWithTimeTableResponseDict(MasterResponseDict):
    work_days: list[int]


class ResponseMasterAdapter(ResponseEntityAdapter):
    @classmethod
    def from_entity_with_timetable(cls, obj: Master) -> MasterWithTimeTableResponseDict:
        work_days: list[int] = []

        for work_day in obj.work_days:
            work_day: WorkDay
            work_days.append(work_day.date.day)

        return MasterWithTimeTableResponseDict(
            name=obj.name, last_name=obj.last_name, pk=obj.pk, work_days=work_days)

    @classmethod
    def from_entity(cls, obj: Master) -> MasterResponseDict:
        return MasterResponseDict(pk=obj.pk, name=obj.name, last_name=obj.last_name)
