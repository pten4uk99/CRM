from datetime import datetime, date
from services.entity.base.fields.base import Field

__all__ = [
    'StrField',
    'IntField',
    'BoolField',
    'DatetimeField',
    'DateField',
]


class StrField(Field):
    type = str


class IntField(Field):
    type = int


class BoolField(Field):
    type = bool


class DatetimeField(Field):
    type = datetime


class DateField(Field):
    type = date
