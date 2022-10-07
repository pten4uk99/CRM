import datetime

from fastapi import APIRouter, Depends, Form, Body
from sqlalchemy.orm import Session

from infrastructure.database.utils import get_db_session
from infrastructure.modules.admin.admin_schemas import MasterCreateIn, DeleteVisitIn
from infrastructure.modules.admin.schemas.response_models import MasterListResponseModel
from infrastructure.schemas import DefaultResponseSchema, MasterDeleteOut, MasterTimeTableOut, MasterWithVisitsOut
from services.aggregates.visit.entity import StatusChoice
from services.controllers.client_detail_controller import ClientDetailController
from services.controllers.delete_visit_controller import DeleteVisitController
from services.controllers.edit_visit_controller import EditVisitController
from services.controllers.get_client_list_controller import GetClientListController
from services.controllers.get_timetable_controller import GetTimeTableController
from services.controllers.get_visit_list_controller import GetVisitListController
from services.controllers.master_create_controller import MasterCreateController
from services.controllers.master_delete_controller import MasterDeleteController
from services.controllers.master_list_controller import MasterListController
from services.controllers.new_visit_controller import NewVisitController
from services.controllers.set_master_timetable_controller import SetMasterTimeTableController
from services.controllers.set_visit_status_controller import SetVisitStatusController

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


@admin_router.post('/visits', response_model=DefaultResponseSchema)
async def new_visit(name: str = Form(default=None), last_name: str = Form(default=None),
                    phone: str = Form(default=None), comment: str = Form(default=None),
                    datetime_start: datetime.datetime = Form(default=None),
                    datetime_end: datetime.datetime = Form(default=None), master_id: int = Form(default=None),
                    either_master: bool = Form(default=None), client_id: int = Form(default=None),
                    session: Session = Depends(get_db_session)):
    controller = NewVisitController(
        session=session, name=name, last_name=last_name, master_id=master_id,
        phone=phone, comment=comment, datetime_start=datetime_start,
        datetime_end=datetime_end, either_master=either_master, client_id=client_id)
    result = controller.handle()
    return result


@admin_router.put('/visits/{visit_id}', response_model=DefaultResponseSchema)
async def edit_visit(visit_id: int, name: str = Form(default=None), last_name: str = Form(default=None),
                     phone: str = Form(default=None), comment: str = Form(default=None),
                     datetime_start: datetime.datetime = Form(default=None),
                     datetime_end: datetime.datetime = Form(default=None), master_id: int = Form(default=None),
                     either_master: bool = Form(default=None), paid: int = Form(default=None),
                     discount: int = Form(default=None), card: int = Form(default=None),
                     client_id: int = Form(default=None), session: Session = Depends(get_db_session)):
    controller = EditVisitController(
        session=session, visit_id=visit_id, name=name, last_name=last_name, master_id=master_id,
        phone=phone, comment=comment, datetime_start=datetime_start,
        datetime_end=datetime_end, either_master=either_master,
        paid=paid, discount=discount, card=card, client_id=client_id)
    result = controller.handle()
    return result


@admin_router.get('/clients', response_model=DefaultResponseSchema)
async def get_client_list(name: str = None, last_name: str = None, phone: str = None,
                          session: Session = Depends(get_db_session)):
    controller = GetClientListController(session=session, name=name, last_name=last_name, phone=phone)
    result = controller.handle()
    return result


@admin_router.get('/visit/{visit_id}/set_status', response_model=DefaultResponseSchema)
async def set_visit_status(visit_id: int, status: StatusChoice, session: Session = Depends(get_db_session)):
    controller = SetVisitStatusController(session=session, visit_id=visit_id, status=status)
    result = controller.handle()
    return result


@admin_router.put('/visit/{visit_id}/delete', response_model=DefaultResponseSchema)
async def delete_visit(visit_id: int, body: DeleteVisitIn, session: Session = Depends(get_db_session)):
    controller = DeleteVisitController(session=session, visit_id=visit_id, delete_reason=body.delete_reason)
    result = controller.handle()
    return result


@admin_router.get('/clients/{client_id}')
async def client_detail(client_id: int, session: Session = Depends(get_db_session)):
    controller = ClientDetailController(session=session, client_id=client_id)
    result = controller.handle()
    return result
