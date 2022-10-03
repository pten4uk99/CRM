from services.use_case.base import UseCase
from services.use_case.base.uc_init import MasterDeleteUseCaseInit
from services.use_case.base.uc_to_delete import MasterDeleteUseCaseToDelete
from services.use_case.response.response_core import MasterDeleteUseCaseResponse


class MasterDeleteUseCase(UseCase):
    _init: MasterDeleteUseCaseInit
    response_class = MasterDeleteUseCaseResponse

    def __init__(self, init: MasterDeleteUseCaseInit):
        super().__init__(init)

    def modify_response(self, use_case_changed=None, use_case_to_delete: MasterDeleteUseCaseToDelete = None):
        self.response = self.response_class.ok(use_case_to_delete)

    def _perform_run(self):
        self.entities_to_delete = MasterDeleteUseCaseToDelete(master=self._init.master)
