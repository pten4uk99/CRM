import datetime

from sqlalchemy import and_

from infrastructure.database.models import VisitDB
from services.aggregates.base.repository.base import Repository
from services.aggregates.visit.adapters.model_adapter import VisitAdapter


class VisitRepository(Repository):
    adapter_class = VisitAdapter
    db_model = VisitDB

    def _getlist(self, date: datetime.date) -> list[VisitDB]:
        dt_start = datetime.datetime(date.year, date.month, date.day, 0, 0)
        dt_end = datetime.datetime(date.year, date.month, date.day, 23, 59)

        visits = self.session.query(VisitDB).filter(and_(
            VisitDB.datetime_start >= dt_start,
            VisitDB.datetime_end <= dt_end,
            VisitDB.delete_reason == None,
        )).all()

        return visits

    def _create(self, adapted_model: VisitDB):
        self.session.add(adapted_model)
        self.session.commit()
