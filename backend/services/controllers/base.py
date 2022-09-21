from typing import Type, Union

from services.entity.base import Entity
from services.response.base import UseCaseControllerResponse
from services.response.response_types import ResponseDict
from services.use_case.base import UseCase
from services.use_case.base.exceptions import UseCaseException


class UseCaseController:
    """
    Контроллер, который осуществляет общение UI и UseCase.

    При инициализации передаются необходимые данные от пользователя.

    При наследовании:
    self._get_use_init_kwargs() - нуждается в переопределении.
    Получает данные из БД и записывает в словарь для инициализации self.use_case_class
    self._handle_use_case() - Лучше не переопределять. Запускает основные действия use_case
    self._save_use_case_result() - Нужно переопределить, если данные нужно сохранить. Сохраняет результат use_case в базу данных

    """

    use_case_class: Type[UseCase] = None
    response_class: Type[UseCaseControllerResponse] = None

    def __init__(self, *args, **kwargs):
        assert self.use_case_class is not None, 'Обязательный атрибут "use_case_class"'
        assert self.response_class is not None, 'Обязательный атрибут "response_class"'

    def _get_use_case_init_kwargs(self) -> dict[str, Union[Entity, list[Entity]]]:
        """
        Возвращает словарь, ключами которого являются параметры инициализации self.use_case_class.
        """

        raise NotImplementedError()

    def _init_use_case(self) -> UseCase:
        """ Инициализирует объект self.use_case_class """

        return self.use_case_class(**self._get_use_case_init_kwargs())

    def _handle_use_case(self, use_case: UseCase) -> ResponseDict:
        """ Запускает сценарий use_case и проверяет выброшенные им исключения, если они есть """

        try:
            result = use_case.run_case()

            if result is not None:
                return self.response_class.ok(*result)
            else:
                return self.response_class.ok()

        except UseCaseException as e:
            return self.response_class.error(detail=e)

    def _save_use_case_result(self, *args: list[Entity], **kwargs: dict[str, Entity]) -> None:
        """ Сохраняет результат use_case в БД """

        raise NotImplementedError()

    def handle(self) -> ResponseDict:
        """
        Интерфейсный метод, в котором происходит запрос необходимых данных из БД,
        Обработка их с помощью сценария использования (UseCase)
        И сохранение данных в БД (если это необходимо)
        """

        use_case = self._init_use_case()
        result = self._handle_use_case(use_case)

        if use_case.changed_entities:
            self._save_use_case_result(*use_case.changed_entities)

        return result
