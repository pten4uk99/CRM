from services.entity.base import Entity


class EntityAdapter:
    """ Адаптирует сущность (Entity) в модель для работы с базой данных и обратно """

    @classmethod
    def to_model(cls, obj: Entity):
        pass

    @classmethod
    def from_model(cls, obj) -> Entity:
        pass
