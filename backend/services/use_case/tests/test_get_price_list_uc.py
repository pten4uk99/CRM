from services.aggregates.price_item.entity import OnePriceItem, ThreePriceItem
from services.aggregates.price_list.entity import PriceList
from services.use_case.base.uc_init import GetPriceListUseCaseInit
from services.use_case.get_price_list_uc import GetPriceListUseCase


def get_use_case_result(price_lists: list[PriceList]):
    """ Инициализирует и запускает CheckAuthUseCase в тестовыми данными """

    init = GetPriceListUseCaseInit(price_lists=price_lists)
    use_case = GetPriceListUseCase(init=init)
    use_case.run_case()
    return use_case.response


def get_one_price_items(price_list_id: int):
    return [
        OnePriceItem(name='item 1', description='desc 1', price_list_id=price_list_id, price=600),
        OnePriceItem(name='item 2', description='desc 2', price_list_id=price_list_id, price=400),
    ]


def get_three_price_items(price_list_id: int):
    return [
        ThreePriceItem(
            name='three',
            description='desc three',
            shirt_price=200,
            middle_price=400,
            long_price=600,
            price_list_id=price_list_id
        ),
        ThreePriceItem(
            name='three 2',
            description='desc three 2',
            shirt_price=200,
            middle_price=400,
            long_price=600,
            price_list_id=price_list_id
        ),
    ]


def get_price_lists():
    return [
        PriceList(pk=1, name='Лист', price_items=get_one_price_items(price_list_id=1)),
        PriceList(pk=2, name='Лист', price_items=get_three_price_items(price_list_id=2)),
    ]


def test_check_right_result():
    """ """

    price_lists = get_price_lists()
    result = get_use_case_result(price_lists)

    data = result['data']

    assert len(data) == 2
    assert len(data[0]['price_items']) == 2
    assert len(data[1]['price_items']) == 2
