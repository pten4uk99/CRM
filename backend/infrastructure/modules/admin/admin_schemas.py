from pydantic import BaseModel


class MasterCreateIn(BaseModel):
    name: str
    last_name: str


