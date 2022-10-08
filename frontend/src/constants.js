export const BASE_URL = 'http://192.168.1.196:8000'

export const STATUS_RESPONSE = {
    success: 'success',
    error: 'error'
}

export const CLIENT_STATUS = {
    completed: 'completed',
    confirmed: 'confirmed',
    need_confirm: 'need_confirm',
    not_called: 'not_called'
}

export const PRICE_LIST_TYPE = {
    one_price_item: 'one_price_item',
    three_price_item: 'three_price_item',
}

export function handleResponse({data, success, clientError, serverError}) {
    if (data?.status === STATUS_RESPONSE.error) clientError(data.detail)
    else if (data?.status === STATUS_RESPONSE.success) success(data)
    else if (data?.detail) {
        serverError(JSON.stringify(data.detail))
        console.log(data)
    } else serverError('Неизвестная ошибка')
}

export const REPLACER = {
    "q": "й", "w": "ц", "e": "у", "r": "к", "t": "е", "y": "н", "u": "г",
    "i": "ш", "o": "щ", "p": "з", "[": "х", "]": "ъ", "a": "ф", "s": "ы",
    "d": "в", "f": "а", "g": "п", "h": "р", "j": "о", "k": "л", "l": "д",
    ";": "ж", "'": "э", "z": "я", "x": "ч", "c": "с", "v": "м", "b": "и",
    "n": "т", "m": "ь", ",": "б", ".": "ю", "/": "."
};

export const HAIR_LENGTHS = {
    shirt: 'Кор',
    middle: 'Ср',
    long: 'Дл'
}

export const MONTHS = {
    1: 'Январь',
    2: 'Февраль',
    3: 'Март',
    4: 'Апрель',
    5: 'Май',
    6: 'Июнь',
    7: 'Июль',
    8: 'Август',
    9: 'Сентябрь',
    10: 'Октябрь',
    11: 'Ноябрь',
    12: 'Декабрь',
}