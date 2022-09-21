from services.entity import AllowedIpAddress
from services.use_case.base import UseCase, UseCaseException


class NewBrowserUseCase(UseCase):
    def __init__(self, ip: str, password: str):
        super().__init__()
        self.ip = ip
        self.password = password

    def __check_password(self):
        if self.password != 'pten4uk':
            raise UseCaseException('Неверный пароль')

    def __check_ip(self):
        if not self.ip:
            raise UseCaseException('Неверный формат ip адреса')

    def _perform_run(self):
        self.__check_password()
        self.__check_ip()

        ip = AllowedIpAddress(ip=self.ip)
        self.changed_entities = [ip]
