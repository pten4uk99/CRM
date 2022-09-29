import pytest

from services.aggregates.allowed_ip_address import AllowedIpAddress
from services.aggregates.base.exceptions import ValidationError
from services.use_case.base.uc_init import CheckAuthUseCaseInit
from services.use_case.check_auth_uc import CheckAuthUseCase


def get_use_case_result(pk: int, ip: str):
    """ Инициализирует и запускает CheckAuthUseCase в тестовыми данными """

    allowed_ip = AllowedIpAddress(pk=pk, ip=ip)
    init = CheckAuthUseCaseInit(allowed_ip=allowed_ip)
    use_case = CheckAuthUseCase(init=init)
    use_case.run_case()
    return allowed_ip, use_case.response


def test_check_init_equal_result():
    """
    Проверяет соответствие переданного при инициализации значения
    результату и созданной сущности AllowedIpAddress
    """

    ip = '123.123.123.1'
    allowed_ip, result = get_use_case_result(1, ip)
    assert result['data'][0]['ip'] == allowed_ip.ip
    assert result['data'][0]['ip'] == ip


@pytest.mark.parametrize('wrong_ip', [('123.123.123',),
                                      (123,)])
def test_check_validation_error(wrong_ip):
    """ Проверяет выброс исключения при переданном неверном ip """

    with pytest.raises(ValidationError):
        get_use_case_result(1, wrong_ip)
