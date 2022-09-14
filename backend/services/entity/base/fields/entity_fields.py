from typing import Type

from services.entity.base.entity_collector import EntityCollector
from services.entity.base.exceptions import EntityDoesNotRegisteredError
from services.entity.base.fields.base import Field


class EntityField(Field):
    """ Поле для сущности """

    type = Type

    def __init__(self, to: str):
        self.entity_name = to

    def __set__(self, instance, value):
        entity = self._get_entity_class(self.entity_name)
        assert isinstance(value, entity), f'Указано неверное значение атрибута "{self.name}" для {instance}'

        instance.__dict__[self.name] = value

    @staticmethod
    def _get_entity_class(entity):
        """
        Проверяет зарегистрирована ли сущность в EntityCollector.
        Выбрасывает исключение, если нет.
        """

        for obj in EntityCollector.get_entities():
            if entity == obj.__class__.__name__:
                return obj

        raise EntityDoesNotRegisteredError()


class ListEntityField(EntityField):
    """
    Поле для списка сущностей.

    """

    type = list

    def __init__(self, children: str):
        super().__init__(children)
