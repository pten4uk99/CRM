import datetime

from services.aggregates.client.entity import Client
from services.aggregates.master.entity import Master
from services.aggregates.visit.entity import Visit, StatusChoice
from services.use_case.base.uc_init import GetVisitListUseCaseInit
from services.use_case.get_visit_list_uc import GetVisitListUseCase


def get_use_case_result(visits: list[Visit]):
    """  """

    init = GetVisitListUseCaseInit(visits=visits)
    use_case = GetVisitListUseCase(init=init)
    use_case.run_case()
    return use_case


def get_visits() -> list[Visit]:
    master = Master(pk=1, name='Китина', last_name='Бублошкин')
    master2 = Master(pk=2, name='Китина', last_name='Бублошкин')

    return [
        Visit(
            pk=1,
            datetime_start=datetime.datetime.now(),
            datetime_end=datetime.datetime.now(),
            status=StatusChoice.confirmed,
            client=Client(pk=1, name='Атикин', last_name='Бублик', phone=79269863149),
            master=master,
            either_master=False,
            paid=700,
            discount=500,
            card=300
        ),
        Visit(
            pk=2,
            datetime_start=datetime.datetime.now(),
            datetime_end=datetime.datetime.now(),
            status=StatusChoice.confirmed,
            client=Client(pk=1, name='Атикин', last_name='Бублик', phone=79269863148),
            master=master,
            either_master=True,
            paid=700,
            discount=500,
            card=300
        ),
        Visit(
            pk=3,
            datetime_start=datetime.datetime.now(),
            datetime_end=datetime.datetime.now(),
            status=StatusChoice.confirmed,
            client=Client(pk=1, name='Атикин', last_name='Бублик', phone=79269863148),
            master=master2,
            either_master=True,
            paid=700,
            discount=500,
            card=300
        ),
    ]


def test_visit_list_success():
    visits = get_visits()
    use_case = get_use_case_result(visits=visits)

    response = use_case.response
    data = response['data']

    assert len(data) == 2  # количество мастеров
    assert len(data[0]['visits']) == 2  # количество визитов у первого мастера
    assert len(data[1]['visits']) == 1  # количество визитов у второго мастера

