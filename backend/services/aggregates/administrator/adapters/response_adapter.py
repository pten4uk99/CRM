from typing import TypedDict

from services.aggregates.administrator.entity import Administrator
from services.aggregates.base.adapters.base import ResponseEntityAdapter


class AdministratorListResponseDict(TypedDict):
    pk: int
    name: str


class ResponseAdministratorListAdapter(ResponseEntityAdapter):
    @classmethod
    def from_entity(cls, obj: Administrator) -> AdministratorListResponseDict:
        return AdministratorListResponseDict(name=obj.name, pk=obj.pk)
