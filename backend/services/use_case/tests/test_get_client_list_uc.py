from services.aggregates.client.entity import Client
from services.use_case.base.uc_init import GetClientListUseCaseInit
from services.use_case.get_client_list_uc import GetClientListUseCase


def get_use_case_result(clients: list[Client]):
    init = GetClientListUseCaseInit(clients=clients)
    use_case = GetClientListUseCase(init)
    use_case.run_case()
    return use_case


def test_success_get():
    clients = [
        Client(pk=1, name='HI', last_name='BI', phone=79269833149),
        Client(pk=1, name='HI', last_name='BI', phone=79269833149),
        Client(pk=1, name='HI', last_name='BI', phone=79269833149),
    ]

    use_case = get_use_case_result(clients)

    data = use_case.response['data']
    assert len(data) == 3
