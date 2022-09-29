from services.local_settings import REGISTER_NEW_BROWSER_PASSWORD
from services.use_case.base.uc_changed import NewBrowserUseCaseChanged
from services.use_case.base.uc_init import NewBrowserUseCaseInit
from services.use_case.new_browser_uc import NewBrowserUseCase


def get_use_case_result(ip: str, password: str):
    init = NewBrowserUseCaseInit(ip=ip, password=password)
    use_case = NewBrowserUseCase(init)
    use_case.run_case()
    return use_case.response, use_case.changed_entities


def test_allowed_ip_created():
    result, changed_entities = get_use_case_result(ip='123.123.123.1', password=REGISTER_NEW_BROWSER_PASSWORD)
    changed_entities: NewBrowserUseCaseChanged

    assert result['data'] == []
    assert changed_entities is not None and changed_entities.allowed_ip
