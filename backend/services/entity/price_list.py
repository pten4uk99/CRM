from services.entity.base import Entity, fields


class PriceList(Entity):
    name = fields.StrField()
    price_items = fields.ListEntityField('PriceItem')

