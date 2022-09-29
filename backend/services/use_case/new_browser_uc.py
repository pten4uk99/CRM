from services.aggregates.allowed_ip_address import AllowedIpAddress
from services.local_settings import REGISTER_NEW_BROWSER_PASSWORD
from services.use_case.response.response_core import NewBrowserUseCaseResponse
from services.use_case.base import UseCase, UseCaseException
from services.use_case.base.uc_changed import NewBrowserUseCaseChanged
from services.use_case.base.uc_init import NewBrowserUseCaseInit


class NewBrowserUseCase(UseCase):
    _init: NewBrowserUseCaseInit
    response_class = NewBrowserUseCaseResponse

    def __init__(self, init: NewBrowserUseCaseInit):
        super().__init__(init)

    def __check_password(self):
        if self._init.password != REGISTER_NEW_BROWSER_PASSWORD:
            raise UseCaseException('Неверный пароль')

    def __check_ip(self):
        if not self._init.ip:
            raise UseCaseException('Неверный формат ip адреса')

    def _perform_run(self):
        self.__check_password()
        self.__check_ip()

        ip = AllowedIpAddress(ip=self._init.ip)
        self.changed_entities = NewBrowserUseCaseChanged(allowed_ip=ip)

