from services.entity.base import Entity, fields


class AllowedIpAddress(Entity):
    ip = fields.StrField()

