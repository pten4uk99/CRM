from services.entity.base.entity import Entity
from services.entity.base import fields


class Client(Entity):
    name = fields.StrField()
    last_name = fields.StrField()
    phone = fields.StrField()
    comment = fields.StrField()
    visits = fields.ListEntityField('Visit')
