from services.aggregates.administrator.entity import Administrator
from services.use_case.base.uc_changed import OpenWorkShiftUseCaseChanged
from services.use_case.base.uc_init import OpenWorkShiftUseCaseInit
from services.use_case.open_work_shift_uc import OpenWorkShiftUseCase


def get_use_case_result(administrator: Administrator):
    init = OpenWorkShiftUseCaseInit(administrator=administrator)
    use_case = OpenWorkShiftUseCase(init)
    use_case.run_case()
    return use_case.changed_entities


def test_work_shift_created():
    administrator = Administrator(pk=1, name='Вася')

    changed_entities = get_use_case_result(administrator=administrator)
    changed_entities: OpenWorkShiftUseCaseChanged

    assert changed_entities.work_shift.administrator == administrator
