class EntityException(Exception):
    pass


class EntityDoesNotRegisteredError(EntityException):
    """ Сущность не зарегистрирована в EntityCollector """


class EntityHasNoAttribute(EntityException):
    """ Сущность не имеет переданного атрибута """
