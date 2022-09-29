from pydantic import BaseModel


class DefaultResponseSchema(BaseModel):
    status: str
    detail: str
    data: list


class AllowedIp(BaseModel):
    ip: str


class CheckAuthOut(DefaultResponseSchema):
    data: list[AllowedIp]
