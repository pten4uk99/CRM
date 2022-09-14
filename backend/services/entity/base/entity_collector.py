from typing import Type

from services.entity.base.entity import Entity


class EntityCollector:
    __entities = []

    @classmethod
    def get_entities(cls) -> list[Type[Entity]]:
        return cls.__entities

    @classmethod
    def register(cls, entity: Type[Entity]):
        """ Добавляет сущность в список зарегистрированных сущностей """

        assert issubclass(entity, Entity), f'Параметр "entity" должен быть типом {Entity}'
        assert entity not in cls.__entities, f'{entity} объект уже зарегистрирован в {cls.__name__}'

        cls.__entities.append(entity)
