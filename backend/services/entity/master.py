from services.entity.base import Entity, fields


class Master(Entity):
    name = fields.StrField()
    last_name = fields.StrField()
    work_days = fields.ListEntityField('WorkDay')
