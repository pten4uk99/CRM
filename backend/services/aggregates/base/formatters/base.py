from services.aggregates.base import Entity


class Formatter:
    def __init__(self, instance: Entity):
        assert isinstance(instance, Entity), f'"instance" атрибут должен быть типом {Entity}'
        self._instance = instance

    def to_dict(self) -> dict:
        """ Преобразовывает объект Entity в dict """

        raise NotImplementedError()
