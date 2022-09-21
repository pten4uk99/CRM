from typing import Union

from services.entity.base import Entity
from .exceptions import NotIsEntityException, UseCaseException, SingleRunException


class UseCase:
    """
    Класс представляющий сценарий использования приложения.

    При наследовании:
    self._perform_run() - основная логика сценария прописывается тут.

    Использование:
    При инициализации передаются сущности (Entity) на вход из внешней среды.

    self.run_case() - интерфейсный метод. Выполняет определенные действия
    с переданными при инициализации сущностями (Entity),
    и сохраняет измененные сущности в self.result.
    self.result - хранит измененные сущности в процессе проведенного случая.

    """

    __changed_entities: list[Entity] = []

    def __init__(self, *args, **kwargs):
        pass

    @property
    def changed_entities(self) -> list[Entity]:
        return self.__changed_entities

    @changed_entities.setter
    def changed_entities(self, entities: list[Entity]):
        for entity in entities:
            if not isinstance(entity, Entity):
                raise NotIsEntityException(f'{entity} не является подклассом {Entity}')

        self.__changed_entities = entities

    def __check_run_allowed(self):
        if self.__changed_entities is None:
            raise SingleRunException()

    def _perform_run(self) -> Union[list[Entity], None]:
        """
        Выполняет непосредственно запуск сценария использования.
        Работает с переданными при инициализации Entity.

        Может возвращать какой либо результат (например, если нужно просто получить объект из бд)
        Или записывать результат изменения в self.changed_entities
        """

        raise NotImplementedError()

    def run_case(self) -> Union[list[Entity], None]:
        """
        Интерфейсный метод для запуска сценария использования.
        Лучше не переопределять.
        """

        self.__check_run_allowed()
        result = self._perform_run()

        if not self.__changed_entities and not result:
            raise UseCaseException('Не получен никакой результат после запуска UseCase. '
                                   'Необходимо добавить измененные сущности в self.changed_entities '
                                   'или self._perform_run должен возвратить список сущностей')

        return result
