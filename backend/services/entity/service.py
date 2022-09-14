from services.entity.base import Entity, fields


class Service(Entity):
    price_item = fields.EntityField('PriceItem')
    quantity = fields.IntField()
    visits = fields.ListEntityField('Visit')

