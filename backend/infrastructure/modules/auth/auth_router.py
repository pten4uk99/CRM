from fastapi import APIRouter

auth_router = APIRouter()


class ClientData(BaseModel):
    ip: str


@auth_router.get('/', response_model=CheckAuthOut)
async def check_auth(request: Request, session: Session = Depends(get_db_session)):
    controller = CheckAuthController(session=session, ip=request.client.host)
    result = controller.handle()
    return result


@auth_router.get('/{password}')
async def new_browser(request: Request, password: str, session: Session = Depends(get_db_session)):
    controller = NewBrowserController(session=session, ip=request.client.host, password=password)
    result = controller.handle()
    return result
