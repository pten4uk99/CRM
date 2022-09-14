from services.entity.base import Entity, fields


class Administrator(Entity):
    name = fields.StrField()
    work_shifts = fields.ListEntityField('WorkShift')
