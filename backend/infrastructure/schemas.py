from pydantic import BaseModel

from infrastructure.modules.admin.admin_schemas import MasterDelete, MasterTimeTable, MasterWithVisits


class DefaultResponseSchema(BaseModel):
    status: str
    detail: str
    data: list


class AllowedIp(BaseModel):
    ip: str


class CheckAuthOut(DefaultResponseSchema):
    data: list[AllowedIp]


class MasterDeleteOut(DefaultResponseSchema):
    data: list[MasterDelete]


class MasterTimeTableOut(DefaultResponseSchema):
    data: list[MasterTimeTable]


class MasterWithVisitsOut(DefaultResponseSchema):
    data: list[MasterWithVisits]