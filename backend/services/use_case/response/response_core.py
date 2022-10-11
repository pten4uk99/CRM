from services.aggregates.administrator.adapters.response_adapter import ResponseAdministratorListAdapter, \
    AdministratorListResponseDict
from services.aggregates.allowed_ip_address.adapters.response_adapter import ResponseAllowedIpAddressAdapter, \
    AllowedIpAddressResponseDict
from services.aggregates.client.adapters.response_adapter import ResponseClientAdapter, ClientResponseDict
from services.aggregates.master.adapters.response_adapter import MasterResponseDict, ResponseMasterAdapter, \
    MasterWithTimeTableResponseDict
from services.aggregates.price_list.adapters.response_adapter import PriceListResponseDict, ResponsePriceListAdapter
from services.aggregates.visit.adapters.response_adapter import ResponseVisitAdapter, MasterWithVisitsResponseDict
from services.use_case.base.uc_changed import MasterCreateUseCaseChanged, SetMasterTimeTableUseCaseChanged
from services.use_case.base.uc_out import CheckAuthUseCaseOut, AdministratorListUseCaseOut, MasterListUseCaseOut, \
    GetTimeTableUseCaseOut, GetPriceListUseCaseOut, GetVisitListUseCaseOut, GetClientListUseCaseOut
from services.use_case.base.uc_to_delete import MasterDeleteUseCaseToDelete, SetMasterTimeTableUseCaseToDelete
from services.use_case.response.base import UseCaseResponse


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
    @classmethod
    def _ok(cls, use_case_changed: MasterCreateUseCaseChanged = None) -> list[MasterResponseDict]:
        if use_case_changed is not None:
            adapted = ResponseMasterAdapter.from_entity(use_case_changed.master)
            return [adapted]
        return []


class MasterDeleteUseCaseResponse(UseCaseResponse):
    @classmethod
    def _ok(cls, use_case_to_delete: MasterDeleteUseCaseToDelete = None) -> list:
        if use_case_to_delete is not None:
            adapted = ResponseMasterAdapter.from_entity(use_case_to_delete.master)
            return [adapted]
        return []


class MasterListUseCaseResponse(UseCaseResponse):
    @classmethod
    def _ok(cls, use_case_out: MasterListUseCaseOut = None) -> list[MasterResponseDict]:
        if use_case_out is None:
            # прописано условие, чтобы сигнатура этого метода совпадала с сигнатурой метода в базовом классе
            raise ValueError(f'"use_case_out" параметр не может быть None')

        masters_list = []

        for master in use_case_out.masters:
            adapted = ResponseMasterAdapter.from_entity(master)
            masters_list.append(adapted)

        return masters_list


class GetTimeTableUseCaseResponse(UseCaseResponse):
    @classmethod
    def _ok(cls, use_case_out: GetTimeTableUseCaseOut = None) -> list[MasterWithTimeTableResponseDict]:
        if use_case_out is None:
            # прописано условие, чтобы сигнатура этого метода совпадала с сигнатурой метода в базовом классе
            raise ValueError(f'"use_case_out" параметр не может быть None')

        response = []

        for master in use_case_out.masters:
            response.append(ResponseMasterAdapter.from_entity_with_timetable(master))

        return response


class SetMasterTimeTableUseCaseResponse(UseCaseResponse):
    @classmethod
    def response_with_changed_entities(cls, use_case_changed: SetMasterTimeTableUseCaseChanged = None,
                                       use_case_to_delete: SetMasterTimeTableUseCaseToDelete = None) -> list[int]:
        work_days = []

        if use_case_changed is not None:
            for work_day in use_case_changed.work_days:
                work_days.append(work_day.date.day)

        return work_days


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
    def _ok(cls, use_case_out: GetVisitListUseCaseOut = None) -> list[MasterWithVisitsResponseDict]:
        result = []

        for master in use_case_out.masters_with_visits:
            result.append(ResponseVisitAdapter.from_master_with_visits(master))

        return result


class EditVisitUseCaseResponse(UseCaseResponse):
    pass


class GetClientListUseCaseResponse(UseCaseResponse):
    @classmethod
    def _ok(cls, use_case_out: GetClientListUseCaseOut = None) -> list[ClientResponseDict]:
        clients = []

        for client in use_case_out.clients:
            clients.append(ResponseClientAdapter.from_entity(client))

        return clients


class SetVisitStatusUseCaseResponse(UseCaseResponse):
    pass


class ClientDetailUseCaseResponse(UseCaseResponse):
    pass


class VisitPaymentUseCaseResponse(UseCaseResponse):
    pass
