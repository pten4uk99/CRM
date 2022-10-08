import {BASE_URL} from "../../../constants";


const HEADERS = {
    'Content-Type': 'application/json',
}

export function fetchAddPriceListCategory({body}) {
    const options = {
        method: 'POST',
        headers: HEADERS,
        credentials: 'include',
        body: JSON.stringify(body)
    }
    return fetch(`${BASE_URL}/admin/price_list`, options)
        .then(response => response.json())
}

export function fetchGetPriceLists({}) {
    const options = {
        method: 'GET',
        headers: HEADERS,
        credentials: 'include',
    }
    return fetch(`${BASE_URL}/admin/price_list`, options)
        .then(response => response.json())
}

export function fetchAddOnePriceItem({body}) {
    const options = {
        method: 'POST',
        headers: HEADERS,
        credentials: 'include',
        body: JSON.stringify(body)
    }
    return fetch(`${BASE_URL}/admin/price_list/one_price_item`, options)
        .then(response => response.json())
}

export function fetchAddThreePriceItem({body}) {
    const options = {
        method: 'POST',
        headers: HEADERS,
        credentials: 'include',
        body: JSON.stringify(body)
    }
    return fetch(`${BASE_URL}/admin/price_list/three_price_item`, options)
        .then(response => response.json())
}
