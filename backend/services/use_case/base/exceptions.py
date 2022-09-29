class UseCaseException(Exception):
    pass


class SingleRunException(UseCaseException):
    """ Объект UseCase не может быть запущен дважды """

    def __str__(self):
        return 'Объект UseCase не может быть запущен дважды'


class NotIsEntityException(UseCaseException):
    """ Объект не является типом Entity """

    def __str__(self):
        return 'Объект не является типом Entity'
