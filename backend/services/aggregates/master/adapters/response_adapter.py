from typing import TypedDict

from services.aggregates.base.adapters.base import ResponseEntityAdapter
from services.aggregates.master.entity import Master
from services.aggregates.work_day.entity import WorkDay


class MasterListResponseDict(TypedDict):
    pk: int
    name: str
    last_name: str


class MasterWorkDayResponseDict(TypedDict):
    date: str


class MasterListWithTimeTableResponseDict(MasterListResponseDict):
    work_days: list[MasterWorkDayResponseDict]


class ResponseMasterListAdapter(ResponseEntityAdapter):
    @classmethod
    def from_entity_with_timetable(cls, obj: Master) -> MasterListWithTimeTableResponseDict:
        work_days: list[MasterWorkDayResponseDict] = []

        for work_day in obj.work_days:
            work_day: WorkDay
            work_days.append(MasterWorkDayResponseDict(date=work_day.date.strftime('%d-%m-%Y')))

        return MasterListWithTimeTableResponseDict(
            name=obj.name, last_name=obj.last_name, pk=obj.pk, work_days=work_days)


    @classmethod
    def from_entity(cls, obj: Master) -> MasterListResponseDict:
        return MasterListResponseDict(pk=obj.pk, name=obj.name, last_name=obj.last_name)
