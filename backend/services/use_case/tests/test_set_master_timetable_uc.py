import datetime

from services.aggregates.work_day.entity import WorkDay
from services.use_case.base.uc_init import SetMasterTimeTableUseCaseInit
from services.use_case.set_master_timetable_uc import SetMasterTimeTableUseCase


def get_use_case_result(current_work_days: list[WorkDay], new_work_days: list[int], year: int, month: int):
    """  """

    init = SetMasterTimeTableUseCaseInit(
        current_work_days=current_work_days, new_work_days=new_work_days, year=year, month=month)
    use_case = SetMasterTimeTableUseCase(init=init)
    use_case.run_case()
    return use_case, use_case.response


def get_work_days(year: int, month: int) -> list[WorkDay]:
    work_days = []

    for i in range(10, 15):
        date = datetime.date(year=year, month=month, day=i)
        work_days.append(WorkDay(date))

    return work_days


def get_new_work_days() -> list[int]:
    work_days = []

    for i in range(8, 13):
        work_days.append(i)

    return work_days


def test_entities_added_to_changed_and_delete():
    """  """

    year = 2015
    month = 12
    current_work_days = get_work_days(year, month)
    new_work_days = get_new_work_days()

    use_case, result = get_use_case_result(
        current_work_days=current_work_days, new_work_days=new_work_days, year=year, month=month)

    assert len(use_case.changed_entities.work_days) == 2
    assert len(use_case.entities_to_delete.work_days) == 2
