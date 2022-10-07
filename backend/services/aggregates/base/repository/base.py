from typing import Optional, TypeVar, Type

from sqlalchemy.orm import Session

from services.aggregates.base.adapters.base import EntityAdapter
from services.aggregates.base import Entity

ModelDB = TypeVar('ModelDB')
SubEntity = TypeVar('SubEntity', bound=Entity)


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
        Прежде чем изменять объект, нужно вызвать метод self.add_instance() и передать в него соответствующую сущность.
        self._create() - создает объект в БД на основе сущности
        self._update() - обновляет объект в БД на основе сущности
        self._delete() - удаляет объект в БД  на основе сущности

    """

    adapter_class: EntityAdapter = None
    db_model: Type[ModelDB] = None

    def __init__(self, session: Session):
        assert self.adapter_class is not None, 'Обязательный атрибут "adapter_class"'
        assert self.db_model is not None, 'Обязательный атрибут "db_model"'

        self.session = session
        self._instance_db = None

    def commit(self):
        self.session.commit()

    def rollback(self):
        self.session.rollback()

    def _get_instance_db(self, pk: int) -> ModelDB:
        return self.session.query(self.db_model).get(pk)

    def set_instance(self, instance: Entity):
        """ Добавляет переданный объект сущности к репозиторию, с которой он может работать """

        assert isinstance(instance, Entity), f'"instance" должен быть типа {Entity}, не {instance.__class__}'
        assert getattr(instance, 'pk', None) is not None, (
            f'"instance" должна иметь первичный ключ (должна существовать в БД)'
        )

        self._instance_db = self._get_instance_db(instance.pk)

    def _adapted_entity_or_none(self, obj=None) -> Optional[SubEntity]:
        """ Возвращает либо Entity, либо None, если obj не передан  """

        if obj is not None:
            return self.adapter_class.to_entity(obj)

    def _adapted_db_model_or_none(self, obj: SubEntity = None):
        """ Возвращает либо адаптированную реляционную модель БД, либо None, если obj не передан """

        if obj is not None:
            return self.adapter_class.from_entity(obj)

    def _get(self, *args, **kwargs) -> ModelDB:
        """ Здесь происходит непосредственное получение объекта из БД """

        raise NotImplementedError()

    def _getlist(self, *args, **kwargs) -> list[ModelDB]:
        """ Здесь происходит непосредственное получение списка объектов из БД """

        raise NotImplementedError()

    def _create(self, adapted_model: ModelDB):
        """
        Тут прописывается непосредственно создание объекта в БД.
        Аргументом передается адаптированная в реляционную модель Entity
        """

        raise NotImplementedError()

    def _update(self, new_entity: SubEntity):
        """
        Тут прописывается непосредственно обновление объекта в БД.
        Обновляется self._instance_db
        """

        raise NotImplementedError()

    def _delete(self):
        """
        Тут прописывается непосредственно удаления объекта в БД.
        Удаляется self._instance_db
        """

        raise NotImplementedError()

    def get(self, *args, **kwargs) -> SubEntity:
        """ Возвращает один объект из базы данных """

        return self._adapted_entity_or_none(self._get(*args, **kwargs))

    def getlist(self, *args, **kwargs) -> list[SubEntity]:
        """ Возвращает несколько объектов из базы данных или пустой массив """

        object_list = self._getlist(*args, **kwargs)
        entities_list = []

        for obj in object_list:
            entity = self._adapted_entity_or_none(obj)

            if entity is not None:
                entities_list.append(entity)

        return entities_list

    def create(self, instance: SubEntity) -> SubEntity:
        """ Интерфейсный метод. Создает новый объект в базе данных на основе self._instance """

        assert getattr(instance, 'pk', None) is None, (
            'Нельзя задавать первичный ключ, он автоматически добавится при сохранении в БД'
        )
        return self._adapted_entity_or_none(self._create(self._adapted_db_model_or_none(instance)))

    def update(self, new_entity: SubEntity):
        """ Интерфейсный метод. Обновляет данные соответственного объекта self._instance в базе данных """

        assert self._instance_db is not None, 'Метод update() требует вызова add_instance()'
        return self._update(new_entity)

    def delete(self):
        """ Удаляет соответственный объект self._instance из базы данных """

        assert self._instance_db is not None, 'Метод delete() требует вызова add_instance()'
        return self._delete()
