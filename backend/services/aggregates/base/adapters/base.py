from services.aggregates.base import Entity


class EntityAdapter:
    """ Адаптирует сущность (Entity) во что-либо другое """

    @classmethod
    def from_entity(cls, obj: Entity):
        raise NotImplementedError()

    @classmethod
    def to_entity(cls, obj) -> Entity:
        raise NotImplementedError()


class ModelEntityAdapter(EntityAdapter):
    """ Адаптирует сущность (Entity) в модель для работы с БД """

    pass


class ResponseEntityAdapter(EntityAdapter):
    """ Адаптирует сущность (Entity) в типизированный словарь для ответа UseCase """

    pass
