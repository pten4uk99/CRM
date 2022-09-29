from services.aggregates.allowed_ip_address.repository import AllowedIpAddressRepository
from services.controllers.base import UseCaseController
from services.use_case.base.uc_changed import NewBrowserUseCaseChanged
from services.use_case.base.uc_init import NewBrowserUseCaseInit
from services.use_case.new_browser_uc import NewBrowserUseCase


class NewBrowserController(UseCaseController):
    use_case_class = NewBrowserUseCase

    def __init__(self, session, ip: str, password: str):
        super().__init__(session=session)
        self.ip = ip
        self.password = password

    def __get_ip(self):
        return self.ip

    def __get_password(self):
        return self.password

    def _get_use_case_init(self):
        return NewBrowserUseCaseInit(ip=self.__get_ip(), password=self.__get_password())

    def _save_use_case_result(self, use_case_changed: NewBrowserUseCaseChanged):
        repo = AllowedIpAddressRepository(self.session)
        repo.create(use_case_changed.allowed_ip)


if __name__ == '__main__':
    controller = NewBrowserController(ip='123.123.123.1', password='pten4uk')
    result = controller.handle()
    print(result)
