from typing import Type

from services.use_case.base import UseCase, UseCaseChanged, UseCaseToDelete
from services.use_case.base.uc_init import UseCaseInit
from services.use_case.response.response_types import ResponseDict


class UseCaseController:
    """
    Контроллер, который осуществляет общение UI и UseCase.

    При инициализации передаются необходимые данные от пользователя.

    При наследовании:
    self._get_use_init() - нуждается в переопределении.
    Получает данные из БД и записывает в словарь для инициализации self.use_case_class
    self._handle_use_case() - Лучше не переопределять. Запускает основные действия use_case
    self._save_use_case_result() - Нужно переопределить, если данные нужно сохранить. Сохраняет результат use_case в базу данных

    """

    use_case_class: Type[UseCase] = None

    def __init__(self, session, *args, **kwargs):
        assert self.use_case_class is not None, 'Обязательный атрибут "use_case_class"'
        assert session is not None, 'Обязательный атрибут "session"'

        self.session = session

    def _get_use_case_init(self) -> UseCaseInit:
        """
        Возвращает словарь, ключами которого являются параметры инициализации self.use_case_class.
        """

        raise NotImplementedError()

    def _init_use_case(self) -> UseCase:
        """ Инициализирует объект self.use_case_class """

        return self.use_case_class(init=self._get_use_case_init())

    def _handle_use_case(self, use_case: UseCase) -> None:
        """ Запускает сценарий use_case и возвращает результат его выполнения """

        use_case.run_case()

    def _save_use_case_result(self, use_case_changed: UseCaseChanged) -> None:
        """ Сохраняет результат use_case в БД """

        raise NotImplementedError()

    def _delete_entities_result(self, use_case_to_delete: UseCaseToDelete) -> None:
        """ Удаляет сущности переданные в use_case_to_delete """

        raise NotImplementedError()

    def handle(self) -> ResponseDict:
        """
        Интерфейсный метод, в котором происходит запрос необходимых данных из БД,
        Обработка их с помощью сценария использования (UseCase)
        И сохранение данных в БД (если это необходимо)
        """

        use_case = self._init_use_case()
        self._handle_use_case(use_case)
        return use_case.response
