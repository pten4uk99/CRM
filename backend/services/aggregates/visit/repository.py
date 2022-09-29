import datetime

from sqlalchemy import and_

from infrastructure.database.models import VisitDB
from services.aggregates.base.repository.base import Repository
from services.aggregates.visit.adapters.model_adapter import VisitAdapter


class VisitRepository(Repository):
    adapter_class = VisitAdapter

    def _getlist(self, date: datetime.date) -> list[VisitDB]:
        return self.session.query(VisitDB).filter(and_(
            VisitDB.datetime_start.date() == date,
            VisitDB.delete_reason is None,
        )).all()

    def _create(self, adapted_model: VisitDB):
        self.session.add(adapted_model)
        self.session.commit()
