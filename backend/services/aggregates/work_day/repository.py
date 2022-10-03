import datetime

from infrastructure.database.models import MasterDB, MasterWorkDayDB, WorkDayDB
from services.aggregates.base.repository.base import Repository
from services.aggregates.work_day.adapters.model_adapter import WorkDayAdapter


class WorkDayRepository(Repository):
    adapter_class = WorkDayAdapter
    db_model = WorkDayDB

    def _delete(self, adapted_model: MasterWorkDayDB):
        # принимаем и удаляем именно ассоциированную таблицу ManyToMany,
        # чтобы удалялся не сам день а именно информация о том, что мастер в этот день работает
        self.session.delete(MasterWorkDayDB)
        self.session.commit()

    def _get(self, date: datetime.date) -> WorkDayDB:
        work_day: WorkDayDB = self.session.query(WorkDayDB).filter(WorkDayDB.date == date).first()

        if not work_day:
            work_day = WorkDayDB(date=date)
            self.session.add(work_day)
            self.session.commit()

        return work_day

    def _create(self, adapted_model: MasterDB):
        self.session.add(adapted_model)
        self.session.commit()
