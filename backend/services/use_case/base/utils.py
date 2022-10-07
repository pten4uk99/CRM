import re
from typing import Optional

from services.use_case.base import UseCaseException


def parse_phone(phone: str) -> Optional[int]:
    if phone is not None:
        try:
            match = re.sub('[^0-9]', '', phone)
            return int(match)
        except (TypeError, ValueError):
            raise UseCaseException('Телефон должен быть в формате "+7(000)-000-00-00"')
