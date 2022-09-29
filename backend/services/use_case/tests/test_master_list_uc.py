import pytest

from services.aggregates.master.entity import Master
from services.use_case.base.uc_init import MasterListUseCaseInit
from services.use_case.master_list_uc import MasterListUseCase


def get_use_case_result(masters: list[Master]):
    """ Инициализирует и запускает MasterListUseCase с тестовыми данными """

    init = MasterListUseCaseInit(masters=masters)
    use_case = MasterListUseCase(init=init)
    use_case.run_case()
    return use_case.response


def get_mock_masters(values: list[dict]) -> list[Master]:
    """ Иммитирует получения списка мастеров из БД """

    masters = []
    for value in values:
        masters.append(Master(pk=value['pk'], name=value['name'], last_name=value['last_name']))

    return masters


@pytest.mark.parametrize('mock', [[{'pk': 1, 'name': 'Виталий', 'last_name': 'Евгеньев'}],
                                  ([{'pk': 1, 'name': 'Евгений', 'last_name': 'Витальев'},
                                    {'pk': 2, 'name': 'Александр', 'last_name': 'Александров'}]),
                                  ])
def test_master_list_success(mock):
    """  """

    masters = get_mock_masters(mock)
    result = get_use_case_result(masters=masters)

    for index, data in enumerate(mock):
        assert result['data'][index]['pk'] == data['pk']
        assert result['data'][index]['name'] == data['name']
        assert result['data'][index]['last_name'] == data['last_name']


def test_master_list_empty():
    result = get_use_case_result([])

    assert result['data'] == []
