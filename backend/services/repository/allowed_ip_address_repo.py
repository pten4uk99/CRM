from services.adapters.model_adapters.allowed_ip_address_adapter import AllowedIpAddressAdapter
from services.entity import AllowedIpAddress
from services.repository.base import Repository


class AllowedIpAddressRepository(Repository):
    adapter_class = AllowedIpAddressAdapter

    @classmethod
    def _get(cls, ip: str):
        # пока что заглушка, позже данные должны браться из БД
        return object()

    @classmethod
    def get(cls, *args, **kwargs) -> AllowedIpAddress:
        return super().get(*args, **kwargs)

    def create(self):
        # пока что заглушка но потом обязательно что нибудь создам тут
        print('Сохранение аловеда в БД')
