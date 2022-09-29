import datetime

from services.aggregates.master.entity import Master
from services.aggregates.work_day.entity import WorkDay
from services.use_case.base.uc_init import GetTimeTableUseCaseInit
from services.use_case.get_timetable_uc import GetTimeTableUseCase


def get_use_case_result(masters: list[Master]):
    """  """

    init = GetTimeTableUseCaseInit(masters=masters)
    use_case = GetTimeTableUseCase(init=init)
    use_case.run_case()
    return use_case.response


def get_work_days():
    return [
        WorkDay(date=datetime.date.today()),
        WorkDay(date=datetime.date.today())
    ]


def get_masters(work_days: list[WorkDay]):
    return [
        Master(name='Атикин', last_name='Бубликов', work_days=work_days),
        Master(name='Грушка', last_name='Кукушкина', work_days=work_days),
    ]


def test_success_get_timetable():
    work_days = get_work_days()
    masters = get_masters(work_days)

    result = get_use_case_result(masters)

    assert len(result['data']) == 2
    assert len(result['data'][0]['work_days']) == 2

