import datetime

from fastapi import APIRouter, Depends, Form, Body
from sqlalchemy.orm import Session

from infrastructure.database.utils import get_db_session
from infrastructure.modules.admin.admin_schemas import MasterCreateIn, DeleteVisitIn, PriceListIn, OnePriceItemIn, \
    ThreePriceItemIn, VisitPaymentIn
from infrastructure.modules.admin.schemas.response_models import MasterListResponseModel
from infrastructure.schemas import DefaultResponseSchema, MasterDeleteOut, MasterTimeTableOut, MasterWithVisitsOut, \
    ClientDetailResponseSchema, VisitServicesResponseSchema
from services.aggregates.visit.entity import StatusChoice
from services.controllers.add_one_price_item_controller import AddOnePriceItemController
from services.controllers.add_price_list_controller import AddPriceListController
from services.controllers.add_three_price_item_controller import AddThreePriceItemController
from services.controllers.client_detail_controller import ClientDetailController
from services.controllers.delete_visit_controller import DeleteVisitController
from services.controllers.edit_visit_controller import EditVisitController
from services.controllers.get_client_list_controller import GetClientListController
from services.controllers.get_price_list_controller import GetPriceListController
from services.controllers.get_timetable_controller import GetTimeTableController
from services.controllers.get_visit_list_controller import GetVisitListController
from services.controllers.get_visit_services_controller import GetVisitServicesController
from services.controllers.master_create_controller import MasterCreateController
from services.controllers.master_delete_controller import MasterDeleteController
from services.controllers.master_list_controller import MasterListController
from services.controllers.new_visit_controller import NewVisitController
from services.controllers.set_master_timetable_controller import SetMasterTimeTableController
from services.controllers.set_visit_status_controller import SetVisitStatusController
from services.controllers.visit_payment_controller import VisitPaymentController

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


@admin_router.post('/price_list')
async def add_price_list(price_list: PriceListIn, session: Session = Depends(get_db_session)):
    controller = AddPriceListController(session=session, name=price_list.name, type_=price_list.type)
    result = controller.handle()
    return result


@admin_router.get('/price_list')
async def get_price_lists(session: Session = Depends(get_db_session)):
    controller = GetPriceListController(session=session)
    result = controller.handle()
    return result


@admin_router.post('/price_list/one_price_item', response_model=DefaultResponseSchema)
async def add_one_price_item(price_item: OnePriceItemIn, session: Session = Depends(get_db_session)):
    controller = AddOnePriceItemController(
        session=session,
        name=price_item.name,
        price_list_id=price_item.price_list_id,
        description=price_item.description,
        price=price_item.price
    )
    result = controller.handle()
    return result


@admin_router.post('/price_list/three_price_item', response_model=DefaultResponseSchema)
async def add_three_price_item(price_item: ThreePriceItemIn, session: Session = Depends(get_db_session)):
    controller = AddThreePriceItemController(
        session=session,
        name=price_item.name,
        price_list_id=price_item.price_list_id,
        description=price_item.description,
        shirt_price=price_item.shirt_price,
        middle_price=price_item.middle_price,
        long_price=price_item.long_price
    )
    result = controller.handle()
    return result


@admin_router.put('/visit_payment/{visit_id}', response_model=DefaultResponseSchema)
async def visit_payment(visit_id: int, body: VisitPaymentIn, session: Session = Depends(get_db_session)):
    controller = VisitPaymentController(
        session=session,
        visit_id=visit_id,
        paid=body.paid,
        discount=body.discount,
        card=body.card,
        services=body.services
    )
    result = controller.handle()
    return result


@admin_router.get('/clients/{client_id}', response_model=ClientDetailResponseSchema)
async def client_detail(client_id: int, session: Session = Depends(get_db_session)):
    controller = ClientDetailController(session=session, client_id=client_id)
    result = controller.handle()
    return result


@admin_router.get('/visit/{visit_id}/services', response_model=VisitServicesResponseSchema)
async def visit_services(visit_id: int, session: Session = Depends(get_db_session)):
    controller = GetVisitServicesController(session=session, visit_id=visit_id)
    result = controller.handle()
    return result
