from services.aggregates.price_item.entity import PriceItem, PriceItemGroup
from services.aggregates.price_list.entity import PriceList, PriceListType
from services.aggregates.visit.value_objects import Service
from services.use_case.base.uc_init import GetVisitServicesUseCaseInit
from services.use_case.get_visit_services_uc import GetVisitServicesUseCase


def get_use_case_result(services: list[Service]):
    """  """

    init = GetVisitServicesUseCaseInit(services=services)
    use_case = GetVisitServicesUseCase(init=init)
    use_case.run_case()
    return use_case


def test_success_get_services():
    price_list = PriceList(pk=1, name='Прайс', type=PriceListType.one_price_item)
    price_item = PriceItem(
        pk=1,
        name='Хай',
        price_list=price_list,
        description='всы',
        price_group=PriceItemGroup.none, price=600
    )

    services = [
        Service(pk=1, quantity=2, price_item=price_item),
    ]

    use_case = get_use_case_result(services)

    data = use_case.response['data'][0]

    assert data['pk'] == 1
    assert data['price_item']['name'] == 'Хай'

