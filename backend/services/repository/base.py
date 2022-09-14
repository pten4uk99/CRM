from services.entity.base import Entity


class Repository:
    def __init__(self, instance: Entity):
        assert isinstance(instance, Entity), f'"instance" должен быть типа {Entity}'
        self._instance = instance

    # UseCase не должны ничего знать о способах получения или сохранения данных
    # они должны просто получать какой то объект сущности, что то с ним делать
    # и куда то передавать дальше по цепочке
    def create(self):
        """ Создает новый объект в базе данных на основе self._instance """

        raise NotImplementedError()

    def update(self):
        """ Обновляет данные соответственного объекта self._instance в базе данных """

        raise NotImplementedError()

    def delete(self):
        """ Удаляет соответственный объект self._instance из базы данных """

        raise NotImplementedError()
