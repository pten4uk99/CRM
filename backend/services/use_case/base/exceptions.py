class UseCaseException(Exception):
    pass


class SingleRunException(UseCaseException):
    """ Объект UseCase не может быть запущен дважды """


class NotIsEntityException(UseCaseException):
    """ Объект не является типом Entity """
