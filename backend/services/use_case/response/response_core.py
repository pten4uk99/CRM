from services.aggregates.administrator.adapters.response_adapter import ResponseAdministratorListAdapter, \
    AdministratorListResponseDict
from services.aggregates.allowed_ip_address.adapters.response_adapter import ResponseAllowedIpAddressAdapter, \
    AllowedIpAddressResponseDict
from services.aggregates.master.adapters.response_adapter import MasterListResponseDict, ResponseMasterListAdapter, \
    MasterListWithTimeTableResponseDict
from services.aggregates.price_list.adapters.response_adapter import PriceListResponseDict, ResponsePriceListAdapter
from services.aggregates.visit.adapters.response_adapter import ResponseVisitAdapter, VisitResponseDict
from services.use_case.response.base import UseCaseResponse
from services.use_case.base.uc_out import CheckAuthUseCaseOut, AdministratorListUseCaseOut, MasterListUseCaseOut, \
    GetTimeTableUseCaseOut, GetPriceListUseCaseOut, GetVisitListUseCaseOut


class CheckAuthUseCaseResponse(UseCaseResponse):
    @classmethod
    def _ok(cls, use_case_out: CheckAuthUseCaseOut = None) -> list[AllowedIpAddressResponseDict]:
        if use_case_out is not None:
            adapted = ResponseAllowedIpAddressAdapter.from_entity(use_case_out.allowed_ip)
            return [adapted]
        return []


class NewBrowserUseCaseResponse(UseCaseResponse):
    @classmethod
    def _ok(cls, *args, **kwargs):
        return []


class AdministratorCreateUseCaseResponse(UseCaseResponse):
    pass


class AdministratorListUseCaseResponse(UseCaseResponse):
    @classmethod
    def _ok(cls, use_case_out: AdministratorListUseCaseOut = None) -> list[AdministratorListResponseDict]:
        if use_case_out is None:
            # прописано условие, чтобы сигнатура этого метода совпадала с сигнатурой метода в базовом классе
            raise ValueError(f'"use_case_out" параметр не может быть None')

        administrator_list = []

        for administrator in use_case_out.administrators:
            adapted = ResponseAdministratorListAdapter.from_entity(administrator)
            administrator_list.append(adapted)

        return administrator_list


class MasterCreateUseCaseResponse(UseCaseResponse):
    pass


class MasterListUseCaseResponse(UseCaseResponse):
    @classmethod
    def _ok(cls, use_case_out: MasterListUseCaseOut = None) -> list[MasterListResponseDict]:
        if use_case_out is None:
            # прописано условие, чтобы сигнатура этого метода совпадала с сигнатурой метода в базовом классе
            raise ValueError(f'"use_case_out" параметр не может быть None')

        masters_list = []

        for master in use_case_out.masters:
            adapted = ResponseMasterListAdapter.from_entity(master)
            masters_list.append(adapted)

        return masters_list


class GetTimeTableUseCaseResponse(UseCaseResponse):
    @classmethod
    def _ok(cls, use_case_out: GetTimeTableUseCaseOut = None) -> list[MasterListWithTimeTableResponseDict]:
        if use_case_out is None:
            # прописано условие, чтобы сигнатура этого метода совпадала с сигнатурой метода в базовом классе
            raise ValueError(f'"use_case_out" параметр не может быть None')

        response = []

        for master in use_case_out.masters:
            response.append(ResponseMasterListAdapter.from_entity_with_timetable(master))

        return response


class AddOnePriceItemUseCaseResponse(UseCaseResponse):
    pass


class AddThreePriceItemUseCaseResponse(UseCaseResponse):
    pass


class GetPriceListUseCaseResponse(UseCaseResponse):
    @classmethod
    def _ok(cls, use_case_out: GetPriceListUseCaseOut = None) -> list[PriceListResponseDict]:
        result = []

        for price_list in use_case_out.price_lists:
            result.append(ResponsePriceListAdapter.from_entity(price_list))

        return result


class AddPriceListUseCaseResponse(UseCaseResponse):
    pass


class OpenWorkShiftUseCaseResponse(UseCaseResponse):
    pass


class CloseWorkShiftUseCaseResponse(UseCaseResponse):
    pass


class GetVisitListUseCaseResponse(UseCaseResponse):
    @classmethod
    def _ok(cls, use_case_out: GetVisitListUseCaseOut = None) -> list[VisitResponseDict]:
        result = []

        for visit in use_case_out.visits:
            result.append(ResponseVisitAdapter.from_entity(visit))

        return result
