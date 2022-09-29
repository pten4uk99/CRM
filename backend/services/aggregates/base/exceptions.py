class EntityException(Exception):
    pass


class EntityDoesNotRegisteredError(EntityException):
    """ Сущность не зарегистрирована в EntityCollector """

    def __str__(self):
        return 'Сущность не зарегистрирована в EntityCollector'


class EntityHasNoAttribute(EntityException):
    """ Сущность не имеет переданного атрибута """

    def __str__(self):
        return 'Сущность не имеет переданного атрибута'


class ValidationError(EntityException):
    """ Ошибка валидации объекта-значения """

    def __str__(self):
        return 'Ошибка валидации объекта-значения'
