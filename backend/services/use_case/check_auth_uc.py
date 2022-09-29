from services.use_case.response.response_core import CheckAuthUseCaseResponse
from services.use_case.base import UseCase
from services.use_case.base.exceptions import UseCaseException
from services.use_case.base.uc_init import CheckAuthUseCaseInit
from services.use_case.base.uc_out import CheckAuthUseCaseOut


class CheckAuthUseCase(UseCase):
    _init: CheckAuthUseCaseInit
    response_class = CheckAuthUseCaseResponse

    def __init__(self, init: CheckAuthUseCaseInit):
        super().__init__(init)

    def __check_ip(self) -> None:
        if self._init.allowed_ip is None:
            raise UseCaseException('Не найдено совпадений по переданному IP адресу')

    def _perform_run(self):
        self.__check_ip()
        return CheckAuthUseCaseOut(allowed_ip=self._init.allowed_ip)

