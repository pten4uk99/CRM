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
    return [
        Visit(
            pk=1,
            datetime_start=datetime.datetime.now(),
            datetime_end=datetime.datetime.now(),
            status=StatusChoice.confirmed,
            client=Client(pk=1, name='Атикин', last_name='Бублик', phone=79269863149),
            master=Master(pk=1, name='Китина', last_name='Бублошкин'),
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
            master=Master(pk=1, name='Китина', last_name='Бублошкин'),
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

    assert len(data) == 2

