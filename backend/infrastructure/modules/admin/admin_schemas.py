import datetime
from typing import Optional

from pydantic import BaseModel

from services.aggregates.visit.entity import StatusChoice


class MasterCreateIn(BaseModel):
    name: str
    last_name: str


class MasterDelete(BaseModel):
    pk: int
    name: str
    last_name: str


class MasterTimeTable(BaseModel):
    pk: int
    name: str
    last_name: str
    work_days: list[int]


class VisitsMaster(BaseModel):
    pk: int
    name: str
    last_name: str


class Client(BaseModel):
    pk: int
    name: str = None
    last_name: str = None
    phone: str


class Visit(BaseModel):
    pk: int
    time_start: datetime.time
    time_end: datetime.time
    duration: int
    either_master: bool
    status: StatusChoice
    client: Optional[Client]
    master: VisitsMaster

    comment: str = None
    paid: int = None
    discount: int = None
    card: int = None
    delete_reason: str = None


class MasterWithVisits(BaseModel):
    master: VisitsMaster
    visits: list[Visit]

class DeleteVisitIn(BaseModel):
    delete_reason: str

