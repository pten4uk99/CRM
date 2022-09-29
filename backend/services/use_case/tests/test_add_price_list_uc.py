from services.use_case.add_price_list_uc import AddPriceListUseCase
from services.use_case.base.uc_changed import AddPriceListUseCaseChanged
from services.use_case.base.uc_init import AddPriceListUseCaseInit


def get_use_case_result(name: str):
    """  """

    init = AddPriceListUseCaseInit(name=name)
    use_case = AddPriceListUseCase(init=init)
    use_case.run_case()
    changed_entities = use_case.changed_entities
    return changed_entities


def test_entities_added_to_changed():
    """  """

    name = 'Бублики'

    changed_entities = get_use_case_result(name=name)
    changed_entities: AddPriceListUseCaseChanged

    price_list = changed_entities.price_list

    assert price_list.name == name
