from infrastructure.database.models import MasterDB, MasterWorkDayDB
from services.aggregates.base.repository.base import Repository
from services.aggregates.master.adapters.model_adapter import MasterAdapter


class WorkDayRepository(Repository):
    adapter_class = MasterAdapter

    def _delete(self, adapted_model: MasterWorkDayDB):
        # принимаем и удаляем именно ассоциированную таблицу ManyToMany,
        # чтобы удалялся не сам день а именно информация о том, что мастер в этот день работает
        self.session.delete(MasterWorkDayDB)
        self.session.commit()

    def _create(self, adapted_model: MasterDB):
        self.session.add(adapted_model)
        self.session.commit()
