from typing import Optional

from services.adapters.base import EntityAdapter
from services.entity.base.entity import Entity


class Repository:
    """
    Предоставляет API для работы с БД.

    При наследовании:

    1. Получение объектов. Все методы получения объектов являются классовыми.
        cls._get() - Можно переопределять. Метод для непосредственного получения одного объекта из БД
        cls.get() - Лучше не переопределять. Интерфейсный метод.

        cls._getlist() - Можно переопределять. Метод для непосредственного получения списка объектов из БД.
        cls.getlist() - Лучше не переопределять. Интерфейсный метод.

    2. Изменение объектов.
        ...

    """

    adapter_class: EntityAdapter = None

    def __init__(self, instance: Entity):
        assert isinstance(instance, Entity), f'"instance" должен быть типа {Entity}'
        self._instance = instance

    @classmethod
    def _adapted_entity_or_none(cls, obj=None) -> Optional[Entity]:
        """ Возвращает либо Entity, либо None, если obj не передан  """

        if obj is not None:
            return cls.adapter_class.from_model(obj)
        return None

    @classmethod
    def _get(cls, *args, **kwargs):
        """ Здесь происходит непосредственное получение объекта из БД """

        raise NotImplementedError()

    @classmethod
    def _getlist(cls, *args, **kwargs):
        """ Здесь происходит непосредственное получение списка объектов из БД """

        raise NotImplementedError()

    @classmethod
    def get(cls, *args, **kwargs) -> Entity:
        """ Возвращает один объект из базы данных """

        return cls._adapted_entity_or_none(cls._get(*args, **kwargs))

    @classmethod
    def getlist(cls, *args, **kwargs) -> list[Entity]:
        """ Возвращает несколько объектов из базы данных или пустой массив """

        object_list = cls._getlist(*args, **kwargs)
        entities_list = []

        for obj in object_list:
            entity = cls._adapted_entity_or_none(obj)

            if entity is not None:
                entities_list.append(entity)

        return entities_list

    def create(self):
        """ Создает новый объект в базе данных на основе self._instance """

        raise NotImplementedError()

    def update(self):
        """ Обновляет данные соответственного объекта self._instance в базе данных """

        raise NotImplementedError()

    def delete(self):
        """ Удаляет соответственный объект self._instance из базы данных """

        raise NotImplementedError()
