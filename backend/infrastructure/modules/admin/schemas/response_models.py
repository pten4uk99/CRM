from infrastructure.modules.admin.schemas.models import Master
from infrastructure.schemas import DefaultResponseSchema


class MasterListResponseModel(DefaultResponseSchema):
    data: list[Master]
