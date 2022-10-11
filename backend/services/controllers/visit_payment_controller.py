from services.aggregates.price_item.repository import PriceItemRepository
from services.aggregates.visit.repository import VisitRepository
from services.controllers.base import UseCaseController
from services.use_case.base.uc_changed import VisitPaymentUseCaseChanged
from services.use_case.base.uc_init import VisitPaymentUseCaseInit
from services.use_case.base.uc_types import VisitPaymentPriceItemIn, VisitPaymentService
from services.use_case.visit_payment_uc import VisitPaymentUseCase


class VisitPaymentController(UseCaseController):
    use_case_class = VisitPaymentUseCase

    def __init__(self, session, visit_id: int, paid: int, services: list[VisitPaymentPriceItemIn] = None,
                 discount: int = None, card: int = None, coloring=None):
        super().__init__(session)

        self._visit_id = visit_id
        self._paid = paid
        self._services = services or []
        self._discount = discount
        self._card = card

    def __get_visit(self):
        repo = VisitRepository(self.session)
        return repo.get(pk=self._visit_id)

    def __get_existing_services(self):
        repo = PriceItemRepository(self.session)

    def __get_services(self) -> list[VisitPaymentService]:
        repo = PriceItemRepository(self.session)
        result = []

        for service in self._services:
            price_item = repo.get(service.pk)
            result.append(VisitPaymentService(price_item=price_item, quantity=service.quantity))

        return result

    def _get_use_case_init(self):
        return VisitPaymentUseCaseInit(
            visit=self.__get_visit(),
            paid=self._paid,
            discount=self._discount,
            card=self._card,
            services=self.__get_services()
        )

    def _save_use_case_result(self, use_case_changed: VisitPaymentUseCaseChanged):
        repo = VisitRepository(self.session)
        repo.set_instance(use_case_changed.visit)
        repo.update(use_case_changed.visit)
