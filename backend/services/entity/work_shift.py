from services.entity.base import Entity, fields


class WorkShift(Entity):
    administrator = fields.EntityField('Administrator')
    date = fields.DateField()
    is_closed = fields.BoolField()

