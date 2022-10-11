from services.use_case.add_one_price_item_uc import AddOnePriceItemUseCase
from services.use_case.base.uc_changed import AddOnePriceItemUseCaseChanged
from services.use_case.base.uc_init import AddOnePriceItemUseCaseInit


def get_use_case_result(name: str, price: int, price_list_id: int, description: str):
    """  """

    init = AddOnePriceItemUseCaseInit(
        name=name, price_list_id=price_list_id, price=price, description=description)
    use_case = AddOnePriceItemUseCase(init=init)
    use_case.run_case()
    changed_entities = use_case.changed_entities
    return changed_entities


def test_entities_added_to_changed_and_delete():
    """  """

    name = 'Бублики'
    price = 600
    price_list_id = 2
    description = 'Привет, я описание'

    changed_entities = get_use_case_result(
        name=name, price_list_id=price_list_id, price=price, description=description)
    changed_entities: AddOnePriceItemUseCaseChanged

    price_item = changed_entities.price_item

    assert price_item.price == price
    assert price_item.description == description
    assert price_item.price_list_id == price_list_id
    assert price_item.name == name

