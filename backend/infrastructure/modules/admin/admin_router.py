from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from starlette.requests import Request

from infrastructure.database.utils import get_db_session
from infrastructure.modules.admin.admin_schemas import MasterCreateIn
from infrastructure.modules.admin.schemas.response_models import MasterListResponseModel
from infrastructure.schemas import DefaultResponseSchema
from services.controllers.master_create_controller import MasterCreateController
from services.controllers.master_list_controller import MasterListController

admin_router = APIRouter(
    prefix='/admin'
)


@admin_router.post('/master', response_model=DefaultResponseSchema)
def create_master(request: Request, master: MasterCreateIn, session: Session = Depends(get_db_session)):
    controller = MasterCreateController(session=session, name=master.name, last_name=master.last_name)
    result = controller.handle()
    return result


@admin_router.get('/master', response_model=MasterListResponseModel)
def get_master_list(request: Request, session: Session = Depends(get_db_session)):
    controller = MasterListController(session=session)
    result = controller.handle()
    return result
