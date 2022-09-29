from dataclasses import dataclass

from services.aggregates.base import Entity
from services.aggregates.base.exceptions import ValidationError


@dataclass
class AllowedIpAddress(Entity):
    ip: str
    pk: int = None

    @property
    def ip(self):
        return self.__ip

    @ip.setter
    def ip(self, value):

        expected_ip_numbers = 4

        if not isinstance(value, str):
            raise ValidationError(f'"{value}" не является типом {str}')

        split = value.split('.')
        if len(split) != expected_ip_numbers:
            raise ValidationError('Неверный формат IP адреса')

        self.__ip = value


if __name__ == '__main__':
    ad = AllowedIpAddress(ip='123.123.123.12')
    print(ad.ip)
