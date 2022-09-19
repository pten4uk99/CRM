from services.entity.base import Entity
from services.response.response_types import ResponseType, ResponseDict


class UseCaseControllerResponse:
    """
    Класс, формирующий ответ UseCaseController.

    При наследовании:
    self._ok() - то, что должно срабатывать при положительном ответе
    self._error() - то, что должно срабатывать при отрицательном ответе
    self._ok_detail() - описание положительного ответа
    self._error_detail() - описание ошибки

    Использование:
    self.ok() - Интерфейсный метод. Положительный ответ
    self.error() - Интерфейсный метод. Ошибка
    """

    @classmethod
    def _ok(cls, *args, **kwargs) -> list:
        """ Срабатывает  """

        return []

    @classmethod
    def _error(cls, *args, **kwargs) -> list:
        return []

    @classmethod
    def _ok_detail(cls) -> str:
        return ''

    @classmethod
    def _error_detail(cls, detail: str = None) -> str:
        return detail

    @classmethod
    def ok(cls, *args: list[Entity], **kwargs: dict[str, Entity]) -> ResponseDict:
        """ Интерфейсный метод. Успешный ответ """

        return ResponseDict(
            status=ResponseType.SUCCESS.value,
            detail=cls._ok_detail(),
            data=cls._ok(*args, **kwargs)
        )

    @classmethod
    def error(cls, *args, **kwargs) -> ResponseDict:
        """ Интерфейсный метод. Ошибка """

        return ResponseDict(
            status=ResponseType.ERROR.value,
            detail=cls._error_detail(kwargs.get('detail', None)),
            data=cls._error(*args, **kwargs)
        )
