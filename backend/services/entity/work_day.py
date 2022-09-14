from services.entity.base import Entity, fields


class WorkDay(Entity):
    date = fields.DateField()
    masters = fields.ListEntityField('Master')
