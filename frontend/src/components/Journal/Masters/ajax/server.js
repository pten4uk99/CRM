import {BASE_URL} from "../../../../constants";


const HEADERS = {
    'Content-Type': 'application/json',
}

export function fetchMastersWithVisits({year, month, day}) {
    const options = {
        method: 'GET',
        credentials: 'include',
    }
    return fetch(`${BASE_URL}/admin/visits/?date=${year}-${month}-${day}`, options)
        .then(response => response.json())
}
