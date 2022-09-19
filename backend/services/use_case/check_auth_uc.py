from services.entity import AllowedIpAddress
from services.use_case.base import UseCase
from services.use_case.base.exceptions import UseCaseException


class CheckAuthUseCase(UseCase):
    def __init__(self, allowed_ip: AllowedIpAddress):
        super().__init__()
        self._allowed_ip = allowed_ip

    def __check_ip(self) -> None:
        if self._allowed_ip is None:
            raise UseCaseException('IP адрес не передан')

    def _perform_run(self):
        self.__check_ip()
        return [self._allowed_ip]
