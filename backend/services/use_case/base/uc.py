from typing import Type, Optional, TypeVar

from services.use_case.base.uc_init import UseCaseInit
from services.use_case.response.base import UseCaseResponse, ResponseDict
from .exceptions import UseCaseException, SingleRunException
from .uc_changed import UseCaseChanged
from .uc_out import UseCaseOut
from .uc_to_delete import UseCaseToDelete
from ...aggregates.base.exceptions import ValidationError

UCChanged = TypeVar('UCChanged', bound=UseCaseChanged)
UCToDelete = TypeVar('UCToDelete', bound=UseCaseToDelete)
UCInit = TypeVar('UCInit', bound=UseCaseInit)
UCOut = TypeVar('UCOut', bound=UseCaseOut)
RDict = TypeVar('RDict', bound=ResponseDict)


class UseCase:
    """
    Класс представляющий сценарий использования приложения.

    При наследовании:
    self._perform_run() - основная логика сценария прописывается тут.

    Использование:
    При инициализации передается параметр init, который является типом UseCaseInit.

    self.run_case() - интерфейсный метод. Выполняет определенные действия
    с переданными при инициализации сущностями (Entity),
    и сохраняет измененные сущности в self.changed_entities, а сущности, подлежащие удалению -
    в self.entities_to_delete
    self.response - хранит ответ UseCase в виде словаря.

    """

    __changed_entities: UCChanged = None
    __entities_to_delete: UCToDelete = None
    __response: RDict = None
    response_class: Type[UseCaseResponse] = None

    def __init__(self, init: UCInit):
        assert isinstance(init, UseCaseInit), f'"init" атрибут должен быть типом {UseCaseInit}'
        assert self.response_class is not None, 'Обязательный атрибут "response_class"'

        self._init = init

    @property
    def response(self) -> RDict:
        return self.__response

    @response.setter
    def response(self, value: RDict):
        assert isinstance(value, dict), f'"response" атрибут должен быть типом {dict}'
        self.__response = value

    @property
    def changed_entities(self) -> UCChanged:
        return self.__changed_entities

    @changed_entities.setter
    def changed_entities(self, use_case_changed: UCChanged):
        assert isinstance(use_case_changed,
                          UseCaseChanged), f'"changed_entities" атрибут должен быть типа {UseCaseChanged}'
        self.__changed_entities = use_case_changed

    @property
    def entities_to_delete(self) -> UCToDelete:
        return self.__entities_to_delete

    @entities_to_delete.setter
    def entities_to_delete(self, use_case_to_delete: UCToDelete):
        assert isinstance(use_case_to_delete,
                          UseCaseToDelete), f'"entities_to_delete" атрибут должен быть типа {UseCaseToDelete}'
        self.__entities_to_delete = use_case_to_delete

    def __check_run_allowed(self):
        if self.__changed_entities or self.entities_to_delete:
            raise SingleRunException()

    def _perform_run(self) -> Optional[UCOut]:
        """
        Выполняет непосредственно запуск сценария использования.
        Работает с переданными при инициализации Entity.

        Может возвращать какой либо результат (например, если нужно просто получить объект из БД)
        Или записывать результат изменения в self.changed_entities
        """

        raise NotImplementedError()

    def _get_success_response(self, result: UCOut = None) -> RDict:
        if result is not None:
            return self.response_class.ok(result)
        else:
            return self.response_class.ok()

    def _check_right_use_case_complete(self, result: UCOut = None):
        """ Проверяет, что результат UseCase был верно получен """

        if result:
            assert isinstance(result, UseCaseOut), (
                f'"_perform_run()" метод должен возвращать объект типа {UseCaseOut}')

        assert self.__changed_entities or result or self.__entities_to_delete, (
            'Не получен никакой результат после запуска UseCase. '
            'Необходимо добавить измененные сущности в self.changed_entities '
            'или self._perform_run должен возвратить список сущностей')

    def modify_response(self, use_case_changed: UCChanged = None, use_case_to_delete: UCToDelete = None):
        """ Позволяет изменить self.response """

        pass

    def run_case(self):
        """
        Интерфейсный метод для запуска сценария использования.
        Лучше не переопределять.
        """

        self.__check_run_allowed()

        try:
            result = self._perform_run()
            self._check_right_use_case_complete(result)  # проверяем все ли правильно отработало в UseCase
            self.response = self._get_success_response(result)

        except (UseCaseException, ValidationError) as e:
            string_detail = str(e)
            self.response = self.response_class.error(detail=string_detail)

