import datetime

from fastapi import APIRouter, Depends, Form
from sqlalchemy.orm import Session

from infrastructure.database.utils import get_db_session
from infrastructure.modules.admin.admin_schemas import MasterCreateIn
from infrastructure.modules.admin.schemas.response_models import MasterListResponseModel
from infrastructure.schemas import DefaultResponseSchema, MasterDeleteOut, MasterTimeTableOut, MasterWithVisitsOut
from services.controllers.get_timetable_controller import GetTimeTableController
from services.controllers.get_visit_list_controller import GetVisitListController
from services.controllers.master_create_controller import MasterCreateController
from services.controllers.master_delete_controller import MasterDeleteController
from services.controllers.master_list_controller import MasterListController
from services.controllers.new_visit_controller import NewVisitController
from services.controllers.set_master_timetable_controller import SetMasterTimeTableController

admin_router = APIRouter(
    prefix='/admin'
)


@admin_router.post('/master', response_model=DefaultResponseSchema)
async def create_master(master: MasterCreateIn, session: Session = Depends(get_db_session)):
    controller = MasterCreateController(session=session, name=master.name, last_name=master.last_name)
    result = controller.handle()
    return result


@admin_router.get('/master', response_model=MasterListResponseModel)
async def get_master_list(session: Session = Depends(get_db_session)):
    controller = MasterListController(session=session)
    result = controller.handle()
    return result


@admin_router.delete('/master/{pk}', response_model=MasterDeleteOut)
async def delete_master(pk: int, session: Session = Depends(get_db_session)):
    controller = MasterDeleteController(session=session, master_id=pk)
    result = controller.handle()
    return result


@admin_router.get('/timetable', response_model=MasterTimeTableOut)
async def get_timetable(month: int, year: int, session: Session = Depends(get_db_session)):
    controller = GetTimeTableController(session=session, month=month, year=year)
    result = controller.handle()
    return result


@admin_router.post('/timetable/{master_id}', response_model=DefaultResponseSchema)
async def set_timetable(master_id: int, year: int, month: int,
                        work_days: list[int], session: Session = Depends(get_db_session)):
    controller = SetMasterTimeTableController(
        session=session, master_id=master_id, year=year, month=month, work_days=work_days)
    result = controller.handle()
    return result


@admin_router.get('/visits', response_model=MasterWithVisitsOut)
async def get_visit_list(date: datetime.date, session: Session = Depends(get_db_session)):
    controller = GetVisitListController(session=session, date=date)
    result = controller.handle()
    return result


@admin_router.post('/visits')
async def new_visit(name: str = Form(default=None), last_name: str = Form(default=None), phone: str = Form(default=None),
                    comment: str = Form(default=None), datetime_start: datetime.datetime = Form(default=None),
                    datetime_end: datetime.datetime = Form(default=None), master_id: int = Form(default=None),
                    either_master: bool = Form(default=None), session: Session = Depends(get_db_session)):
    controller = NewVisitController(
        session=session, name=name, last_name=last_name, master_id=master_id,
        phone=phone, comment=comment, datetime_start=datetime_start,
        datetime_end=datetime_end, either_master=either_master)
    result = controller.handle()
    return result

