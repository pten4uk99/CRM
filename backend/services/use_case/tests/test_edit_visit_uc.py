import datetime

from services.aggregates.client.entity import Client
from services.aggregates.master.entity import Master
from services.aggregates.visit.entity import Visit, StatusChoice
from services.use_case.base.uc_init import EditVisitUseCaseInit
from services.use_case.edit_visit_uc import EditVisitUseCase


def get_use_case_result(old_visit: Visit, datetime_start: datetime.datetime = None,
                        datetime_end: datetime.datetime = None, phone: str = None,
                        name: str = None, last_name: str = None, comment: str = None,
                        master: Master = None, paid: int = None,
                        discount: int = None, card: int = None, client: Client = None):
    init = EditVisitUseCaseInit(
        day_visits=[],
        old_visit=old_visit,
        datetime_start=datetime_start,
        datetime_end=datetime_end,
        phone=phone,
        name=name,
        last_name=last_name,
        comment=comment,
        master=master,
        paid=paid,
        discount=discount,
        card=card,
        client=client
    )
    use_case = EditVisitUseCase(init)
    use_case.run_case()
    return use_case


def get_visit(master: Master, client: Client = None):
    return Visit(
        pk=1,
        datetime_start=datetime.datetime.now(),
        datetime_end=datetime.datetime.now() + datetime.timedelta(hours=1),
        either_master=False,
        status=StatusChoice.confirmed,
        master=master,
        client=client
    )


def test_success_change_data():
    old_master = Master(pk=1, name='Бла', last_name='Бло')
    new_master = Master(pk=2, name='Прив', last_name='пок')
    client = Client(pk=1, phone=79269863149, name='Бубл')
    old_visit = get_visit(old_master, client)

    use_case = get_use_case_result(
        old_visit=old_visit,
        master=new_master,
        card=1000,
        phone='79269863148',

    )

    changed_visit: Visit = use_case.changed_entities.visit

    assert changed_visit.master.pk == new_master.pk
    assert changed_visit.card == 1000
    assert changed_visit.client.phone == 79269863148
    assert changed_visit.client.pk == client.pk
    assert changed_visit.pk == old_visit.pk


def test_success_add_client_in_visit():
    master = Master(pk=1, name='s', last_name='d')
    phone = '79269863148'
    visit = get_visit(master=master)

    use_case = get_use_case_result(old_visit=visit, phone=phone)

    visit = use_case.changed_entities.visit

    assert visit.client.phone == int(phone)


