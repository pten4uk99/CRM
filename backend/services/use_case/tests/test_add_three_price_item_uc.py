from services.use_case.add_three_price_item_uc import AddThreePriceItemUseCase
from services.use_case.base.uc_changed import AddOnePriceItemUseCaseChanged, AddThreePriceItemUseCaseChanged
from services.use_case.base.uc_init import AddThreePriceItemUseCaseInit


def get_use_case_result(name: str, shirt_price: int,
                        middle_price: int, long_price: int,
                        price_list_id: int, description: str):
    """  """

    init = AddThreePriceItemUseCaseInit(
        name=name,
        price_list_id=price_list_id,
        shirt_price=shirt_price,
        middle_price=middle_price,
        long_price=long_price,
        description=description
    )
    use_case = AddThreePriceItemUseCase(init=init)
    use_case.run_case()
    changed_entities = use_case.changed_entities
    return changed_entities


def test_entities_added_to_changed_and_delete():
    """  """

    name = 'Бублики'
    shirt_price = 600
    middle_price = 800
    long_price = 1000
    price_list_id = 2
    description = 'Привет, я описание'

    changed_entities = get_use_case_result(
        name=name,
        price_list_id=price_list_id,
        shirt_price=shirt_price,
        middle_price=middle_price,
        long_price=long_price,
        description=description
    )
    changed_entities: AddThreePriceItemUseCaseChanged

    price_item = changed_entities.three_price_item

    assert price_item.shirt_price == shirt_price
    assert price_item.middle_price == middle_price
    assert price_item.long_price == long_price
    assert price_item.description == description
    assert price_item.price_list_id == price_list_id
    assert price_item.name == name
