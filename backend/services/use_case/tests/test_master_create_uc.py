from services.use_case.base.uc_changed import MasterCreateUseCaseChanged
from services.use_case.base.uc_init import MasterCreateUseCaseInit
from services.use_case.master_create_uc import MasterCreateUseCase


def get_use_case_result(name: str, last_name: str):
    """ Инициализирует и запускает AdministratorCreateUseCase в тестовыми данными """

    init = MasterCreateUseCaseInit(name=name, last_name=last_name)
    use_case = MasterCreateUseCase(init=init)
    use_case.run_case()
    return use_case.changed_entities, use_case.response


def test_master_created():
    """ Проверяет добавилась ли сущность администратора в changed_entities """

    name = 'Виталий'
    last_name = 'Гаврилов'
    changed_entities, result = get_use_case_result(name=name, last_name=last_name)
    changed_entities: MasterCreateUseCaseChanged

    assert changed_entities is not None and \
           changed_entities.master.name == name and \
           changed_entities.master.last_name == last_name

