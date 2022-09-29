import pytest

from services.aggregates.administrator.entity import Administrator
from services.use_case.administrator_list_uc import AdministratorListUseCase
from services.use_case.base.uc_init import AdministratorListUseCaseInit


def get_use_case_result(administrators: list[Administrator]):
    """ Инициализирует и запускает AdministratorCreateUseCase в тестовыми данными """

    init = AdministratorListUseCaseInit(administrators=administrators)
    use_case = AdministratorListUseCase(init=init)
    use_case.run_case()
    return use_case.response


def get_mock_administrators(values: list[dict]) -> list[Administrator]:
    """ Иммитирует получения списка администраторов из БД """

    administrators = []
    for value in values:
        administrators.append(Administrator(pk=value['pk'], name=value['name']))

    return administrators


@pytest.mark.parametrize('mock', [[{'pk': 1, 'name': 'Виталий'}],
                                  ([{'pk': 1, 'name': 'Евгений'}, {'pk': 2, 'name': 'Александр'}]),
                                  ])
def test_administrator_list_success(mock):
    """ Проверяет добавилась ли сущность администратора в changed_entities """

    administrators = get_mock_administrators(mock)
    result = get_use_case_result(administrators=administrators)

    for index, data in enumerate(mock):
        assert result['data'][index]['pk'] == data['pk']
        assert result['data'][index]['name'] == data['name']


def test_administrator_list_empty():
    result = get_use_case_result([])

    assert result['data'] == []
