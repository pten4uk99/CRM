from services.aggregates.master.repository import MasterRepository
from services.controllers.base import UseCaseController
from services.use_case.base.uc_changed import MasterCreateUseCaseChanged
from services.use_case.base.uc_init import MasterCreateUseCaseInit, MasterDeleteUseCaseInit
from services.use_case.base.uc_to_delete import MasterDeleteUseCaseToDelete
from services.use_case.master_delete_uc import MasterDeleteUseCase


class MasterDeleteController(UseCaseController):
    use_case_class = MasterDeleteUseCase

    def __init__(self, session, master_id: int):
        super().__init__(session=session)

        self._master_id = master_id

    def __get_master(self):
        repo = MasterRepository(self.session)
        return repo.get(self._master_id)

    def _get_use_case_init(self):
        return MasterDeleteUseCaseInit(master=self.__get_master())

    def _delete_entities_result(self,
                                use_case_to_delete: MasterDeleteUseCaseToDelete) -> MasterDeleteUseCaseToDelete:
        repo = MasterRepository(self.session)
        repo.set_instance(use_case_to_delete.master)
        repo.delete()
        return use_case_to_delete
