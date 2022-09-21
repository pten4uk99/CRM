from services.adapters.base import EntityAdapter
from services.entity import AllowedIpAddress


class AllowedIpAddressAdapter(EntityAdapter):
    @classmethod
    def to_entity(cls, obj) -> AllowedIpAddress:
        # пока что заглушка, в будущем тут должно быть преобразование форматов из моделей бд в сущность
        return AllowedIpAddress(pk=1, ip='123.123.123.1')
