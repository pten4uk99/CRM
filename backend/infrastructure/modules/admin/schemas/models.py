from pydantic import BaseModel


class Master(BaseModel):
    pk: int
    name: str
    last_name: str
