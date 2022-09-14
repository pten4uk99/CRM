from services.entity.base import Entity, fields


class PriceItem(Entity):
    name = fields.StrField()
    description = fields.StrField()
    price = fields.IntField()
    price_list = fields.EntityField('PriceList')

