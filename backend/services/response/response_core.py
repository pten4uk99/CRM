from services.adapters.response_adapters.response_allowed_ip_address_adapter import ResponseAllowedIpAddressAdapter, \
    AllowedIpAddressResponseDict
from services.entity import AllowedIpAddress
from services.response.base import UseCaseControllerResponse


class CheckAuthControllerResponse(UseCaseControllerResponse):
    @classmethod
    def _ok(cls, allowed_ip: AllowedIpAddress) -> list[AllowedIpAddressResponseDict]:
        adapted = ResponseAllowedIpAddressAdapter.from_entity(allowed_ip)
        return [adapted]


class NewBrowserControllerResponse(UseCaseControllerResponse):
    @classmethod
    def _ok(cls, *args, **kwargs):
        return []
