from services.controllers.base import UseCaseController
from services.entity import AllowedIpAddress
from services.repository.allowed_ip_address_repo import AllowedIpAddressRepository
from services.response.response_core import CheckAuthControllerResponse
from services.use_case.check_auth_uc import CheckAuthUseCase


class CheckAuthController(UseCaseController):
    use_case_class = CheckAuthUseCase
    response_class = CheckAuthControllerResponse

    def __init__(self, ip: str):
        super().__init__()
        self.ip = ip

    def __get_allowed_ip_address(self) -> AllowedIpAddress:
        return AllowedIpAddressRepository.get(self.ip)

    def _get_use_case_init_kwargs(self):
        init_kwargs = {
            'allowed_ip': self.__get_allowed_ip_address()
        }
        return init_kwargs


if __name__ == '__main__':
    controller = CheckAuthController('123.123.123.1')
    result = controller.handle()
    print(result['data'][0]['ip'])
