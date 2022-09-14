from services.entity.base import Entity, fields


class Visit(Entity):
    datetime_start = fields.DatetimeField()
    datetime_end = fields.DatetimeField()

    services = fields.ListEntityField('Service')
    client = fields.EntityField('Client')
    master = fields.EntityField('Master')
    work_shift = fields.EntityField('WorkShift')

    status = fields.StrField()
    delete_reason = fields.StrField()

    paid = fields.IntField()
    discount = fields.IntField()
    card = fields.IntField()

