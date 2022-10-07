import datetime

from services.aggregates.client.entity import Client
from services.aggregates.master.entity import Master
from services.use_case.base.uc_changed import NewVisitUseCaseChanged
from services.use_case.base.uc_init import NewVisitUseCaseInit
from services.use_case.new_visit_uc import NewVisitUseCase


def get_use_case_result(datetime_start: datetime.datetime,
                        datetime_end: datetime.datetime, phone: str = None,
                        name: str = None, last_name: str = None, comment: str = None,
                        client: Client = None, master: Master = None):
    init = NewVisitUseCaseInit(
        datetime_start=datetime_start,
        datetime_end=datetime_end,
        phone=phone,
        name=name,
        last_name=last_name,
        comment=comment,
        client=client,
        master=master,
        either_master=True,
        day_visits=[]
    )
    use_case = NewVisitUseCase(init)
    use_case.run_case()
    return use_case


def test_without_client_data():
    use_case = get_use_case_result(datetime_start=datetime.datetime.now(), datetime_end=datetime.datetime.now())

    result = use_case.changed_entities
    result: NewVisitUseCaseChanged

    assert result.visit is not None
    assert result.client is None


def test_with_not_existing_client():
    use_case = get_use_case_result(
        datetime_start=datetime.datetime.now(), datetime_end=datetime.datetime.now(), phone=89269863149)

    result = use_case.changed_entities
    result: NewVisitUseCaseChanged

    assert result.visit is not None
    assert result.client is not None


def test_with_existing_client():
    use_case = get_use_case_result(
        datetime_start=datetime.datetime.now(),
        datetime_end=datetime.datetime.now(),
        client=Client(pk=1, phone=89269863149)
    )

    result = use_case.changed_entities
    result: NewVisitUseCaseChanged

    assert result.visit.client is not None
    assert result.client is None
