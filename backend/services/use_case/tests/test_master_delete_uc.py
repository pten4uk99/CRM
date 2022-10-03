from services.aggregates.master.entity import Master
from services.use_case.base.uc_init import MasterDeleteUseCaseInit
from services.use_case.master_delete_uc import MasterDeleteUseCase


def get_use_case_result(master: Master):
    init = MasterDeleteUseCaseInit(master=master)
    use_case = MasterDeleteUseCase(init=init)
    use_case.run_case()
    return use_case


def test_master_add_to_delete():
    master = Master(pk=1, name='Priv', last_name='Poka')
    use_case = get_use_case_result(master)

    print(use_case.entities_to_delete)
