from services.entity.base.exceptions import EntityHasNoAttribute


class Entity:
    def __init__(self, pk=None, **kwargs):
        self.pk = pk

        for key, value in kwargs.items():
            if not hasattr(self, key):
                raise EntityHasNoAttribute(f'Сущность {self} не имеет атрибута {key}')

            setattr(self, key, value)
