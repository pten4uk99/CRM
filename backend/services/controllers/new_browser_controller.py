from services.controllers.base import UseCaseController
from services.entity import AllowedIpAddress
from services.repository.allowed_ip_address_repo import AllowedIpAddressRepository
from services.response.response_core import NewBrowserControllerResponse
from services.use_case.new_browser_uc import NewBrowserUseCase


class NewBrowserController(UseCaseController):
    use_case_class = NewBrowserUseCase
    response_class = NewBrowserControllerResponse

    def __init__(self, ip: str, password: str):
        super().__init__()
        self.ip = ip
        self.password = password

    def __get_ip(self):
        return self.ip

    def __get_password(self):
        return self.password

    def _get_use_case_init_kwargs(self):
        init_kwargs = {
            'ip': self.__get_ip(),
            'password': self.__get_password()
        }
        return init_kwargs

    def _save_use_case_result(self, allowed_ip: AllowedIpAddress):
        AllowedIpAddressRepository(allowed_ip).create()


if __name__ == '__main__':
    controller = NewBrowserController(ip='123.123.123.1', password='pten4uk')
    result = controller.handle()
    print(result)

