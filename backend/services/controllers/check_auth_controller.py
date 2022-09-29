from services.aggregates.allowed_ip_address import AllowedIpAddress
from services.controllers.base import UseCaseController
from services.aggregates.allowed_ip_address.repository import AllowedIpAddressRepository
from services.use_case.check_auth_uc import CheckAuthUseCase
from services.use_case.base.uc_init import CheckAuthUseCaseInit


class CheckAuthController(UseCaseController):
    use_case_class = CheckAuthUseCase

    def __init__(self, session, ip: str):
        super().__init__(session=session)
        self.ip = ip

    def __get_allowed_ip_address(self) -> AllowedIpAddress:
        repo = AllowedIpAddressRepository(self.session)
        return repo.get(ip=self.ip)

    def _get_use_case_init(self) -> CheckAuthUseCaseInit:
        return CheckAuthUseCaseInit(allowed_ip=self.__get_allowed_ip_address())


if __name__ == '__main__':
    controller = CheckAuthController('123.123.123.1')
    result = controller.handle()
    print(result['data'][0]['ip'])
