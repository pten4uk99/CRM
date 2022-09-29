import datetime

from services.aggregates.work_shift.entity import WorkShift
from services.use_case.base.uc_changed import CloseWorkShiftUseCaseChanged
from services.use_case.base.uc_init import CloseWorkShiftUseCaseInit
from services.use_case.close_work_whift_uc import CloseWorkShiftUseCase


def get_use_case_result(work_shift: WorkShift):
    init = CloseWorkShiftUseCaseInit(work_shift=work_shift)
    use_case = CloseWorkShiftUseCase(init)
    use_case.run_case()
    return use_case.changed_entities


def test_work_shift_closed():
    work_shift = WorkShift(pk=1, datetime=datetime.datetime.now(), is_closed=False)

    changed_entities = get_use_case_result(work_shift=work_shift)
    changed_entities: CloseWorkShiftUseCaseChanged

    assert changed_entities.work_shift.is_closed
