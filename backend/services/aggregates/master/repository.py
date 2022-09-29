from sqlalchemy import and_

from infrastructure.database.models import MasterDB, WorkDayDB, MasterWorkDayDB
from services.aggregates.base.repository.base import Repository
from services.aggregates.master.adapters.model_adapter import MasterAdapter
from services.aggregates.master.entity import Master
from services.aggregates.work_day.entity import WorkDay


class MasterRepository(Repository):
    adapter_class = MasterAdapter
    db_model = MasterDB

    def __init__(self, session):
        super().__init__(session)
        self._instance_db = None

    def _get_work_day_db(self, work_day: WorkDay):
        work_day_db = self.session.query(WorkDayDB).filter_by(date=work_day.date).first()

        if not work_day_db:
            work_day_db = WorkDayDB(date=work_day.date)
            self.session.add(work_day_db)
            self.session.commit()

        return work_day_db

    def _create_master_work_day_db(self):
        return MasterWorkDayDB()

    def add_work_day_to_instance(self, work_day: WorkDay, commit: bool = True):
        """
        Добавляет к объекту MasterDB объект WorkDayDB через ассоциативную таблицу.
        Если объект WorkDay существует в БД, то берется он (по дате), если нет, то создается.

        Сохраняет все это в БД, если параметр commit=True.
        """

        master_db = self._instance_db
        work_day_db = self._get_work_day_db(work_day)

        master_work_day_db = self._create_master_work_day_db()
        master_work_day_db.work_day = work_day_db

        master_db.work_days.append(master_work_day_db)

        self.session.add(master_db)

        if commit:
            self.session.commit()

    def _delete_master_work_day(self, master_db: MasterDB, work_day_db: WorkDayDB):
        query = self.session.query(MasterWorkDayDB)
        filtered_query = query.filter(and_(MasterDB.pk == master_db.pk, WorkDayDB.pk == work_day_db.pk))
        filtered_query.delete()

    def remove_work_day_from_instance(self, work_day: WorkDay, commit: bool = True):
        """
        Удаляет ассоциативную таблицу переданного work_day с текущим мастером (self._instance).
        Если объект WorkDay существует в БД, то берется он (по дате), если нет, то создается.

        Сохраняет все это в БД, если параметр commit=True.
        """

        master_db = self._instance_db
        work_day_db = self._get_work_day_db(work_day)
        self._delete_master_work_day(master_db, work_day_db)

        if commit:
            self.session.commit()

    def _getlist(self, *args, **kwargs) -> list[MasterDB]:
        result = self.session.query(self.db_model).all()
        return result

    def _get(self, pk: int) -> MasterDB:
        result = self.session.query(self.db_model).get(pk)
        return result

    def get_associate_master_work_days(self, master_id: int, year: int, month: int) -> list[WorkDay]:
        """ Возвращает все объекты WorkDay, взятые из ассоциативных таблиц мастера """

        query = self.session.query(MasterWorkDayDB)
        filtered_query = query.filter(and_(
            MasterDB.pk == master_id, WorkDayDB.date.year == year, WorkDayDB.date.month == month)
        )

        work_days = []
        for work_day in filtered_query:
            adapted = self.adapter_class.adapt_master_work_day_model_to_work_day(work_day)
            work_days.append(adapted)

        return work_days

    def getlist(self) -> list[Master]:
        return super().getlist()

    def get(self, pk: int) -> Master:
        return super().get(pk)

    def _create(self, adapted_model: MasterDB):
        self.session.add(adapted_model)
        self.session.commit()
