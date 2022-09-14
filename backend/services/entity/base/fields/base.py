class Field:
    type = None

    def __set_name__(self, owner, name):
        self.name = name

    def __get__(self, instance, owner):
        return instance.__dict__.get(self.name, None)

    def __set__(self, instance, value):
        assert isinstance(value, self.type), (
            f'Неверный тип данных для поля "{self.__class__.__name__}" '
            f'объекта {instance.__class__.__name__}'
        )
        instance.__dict__[self.name] = value
