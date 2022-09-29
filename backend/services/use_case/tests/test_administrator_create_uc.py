from services.use_case.administrator_create_uc import AdministratorCreateUseCase
from services.use_case.base.uc_changed import AdministratorCreateUseCaseChanged
from services.use_case.base.uc_init import AdministratorCreateUseCaseInit


def get_use_case_result(name: str):
    """ Инициализирует и запускает AdministratorCreateUseCase в тестовыми данными """

    init = AdministratorCreateUseCaseInit(admin_name=name)
    use_case = AdministratorCreateUseCase(init=init)
    use_case.run_case()
    return use_case.changed_entities, use_case.response


def test_administrator_created():
    """ Проверяет добавилась ли сущность администратора в changed_entities """

    name = 'Виталий'
    changed_entities, result = get_use_case_result(name)
    changed_entities: AdministratorCreateUseCaseChanged

    assert changed_entities is not None and changed_entities.administrator.name == name
    
