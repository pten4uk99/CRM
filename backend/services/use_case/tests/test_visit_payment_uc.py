import datetime

from services.aggregates.price_item.entity import PriceItem, PriceItemGroup
from services.aggregates.visit.entity import Visit, StatusChoice
from services.aggregates.work_day.entity import WorkDay
from services.use_case.base.uc_init import VisitPaymentUseCaseInit
from services.use_case.base.uc_types import VisitPaymentService
from services.use_case.visit_payment_uc import VisitPaymentUseCase


def get_use_case_result(visit: Visit, services: list[VisitPaymentService],
                        discount: int = None, card: int = None, paid: int = None):
    """  """

    init = VisitPaymentUseCaseInit(visit=visit, services=services, discount=discount, card=card, paid=paid)
    use_case = VisitPaymentUseCase(init=init)
    use_case.run_case()
    return use_case


def get_services() -> list[VisitPaymentService]:
    price_item1 = PriceItem(pk=1, name='1', price=600, price_group=PriceItemGroup.none, description='1')
    price_item2 = PriceItem(pk=2, name='2', price=600, price_group=PriceItemGroup.none, description='1')

    return [
        VisitPaymentService(price_item=price_item1, quantity=3),
        VisitPaymentService(price_item=price_item2, quantity=2)
    ]


def test_success_visit_payment():
    visit = Visit(
        pk=1,
        datetime_start=datetime.datetime.now(),
        datetime_end=datetime.datetime.now(),
        either_master=False,
        status=StatusChoice.confirmed
    )
    services = get_services()
    use_case = get_use_case_result(visit=visit, services=services)

    visit: Visit = use_case.changed_entities.visit
    assert len(visit.services) == 2
    assert visit.status == StatusChoice.completed
