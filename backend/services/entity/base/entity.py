from services.entity.base.exceptions import EntityHasNoAttribute
from services.repository.base import Repository


class Entity:
    _repo_class = None

    def __init__(self, pk, **kwargs):
        self.repo = self.__get_repository()

        self.pk = pk

        for key, value in kwargs:
            if not hasattr(self, key):
                raise EntityHasNoAttribute(f'Сущность {self} не имеет атрибута {key}')

            setattr(self, key, value)

    def __get_repository(self):
        """ Проверяет корректность атрибута "_repo_class" и возвращает объект Repository """

        assert self._repo_class is not None, f'Обязательный атрибут "_repo_class" для сущности {self}'
        assert issubclass(self._repo_class, Repository), f'Атрибут "_repo_class" должен быть типом {Repository}'
        return self._repo_class(self)
