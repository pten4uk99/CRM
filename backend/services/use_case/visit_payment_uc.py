from services.aggregates.visit.entity import Visit, StatusChoice
from services.aggregates.visit.value_objects import Service
from services.use_case.base import UseCase, UseCaseException
from services.use_case.base.uc_changed import VisitPaymentUseCaseChanged
from services.use_case.base.uc_init import VisitPaymentUseCaseInit
from services.use_case.response.response_core import VisitPaymentUseCaseResponse


class VisitPaymentUseCase(UseCase):
    _init: VisitPaymentUseCaseInit
    response_class = VisitPaymentUseCaseResponse

    def __init__(self, init: VisitPaymentUseCaseInit):
        super().__init__(init)

    def _add_one_price_items(self, visit: Visit):
        services = self._init.services
        visit.services = []

        for service in services:
            visit.services.append(Service(quantity=service.quantity, price_item=service.price_item))

    def _perform_run(self):
        visit = self._init.visit

        if visit.status == StatusChoice.completed:
            raise UseCaseException('Нельзя оплатить визит дважды')
        if self._init.paid is None:
            raise UseCaseException('Нужно указать сумму оплаты клиентом')

        visit.discount = self._init.discount or visit.discount
        visit.card = self._init.card or visit.card
        visit.paid = self._init.paid
        visit.status = StatusChoice.completed

        self._add_one_price_items(visit)

        self.changed_entities = VisitPaymentUseCaseChanged(visit=visit)
