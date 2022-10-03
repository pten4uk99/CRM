import {BASE_URL} from "../../../constants";


const HEADERS = {
    'Content-Type': 'application/json',
}

export function fetchMasterList() {
    const options = {
        method: 'GET',
        credentials: 'include',
    }
    return fetch(`${BASE_URL}/admin/master`, options).then(response => response.json())
}


export function fetchCreateMaster(data) {
    const options = {
        method: 'POST',
        headers: HEADERS,
        credentials: 'include',
        body: JSON.stringify(data)
    }
    return fetch(`${BASE_URL}/admin/master`, options).then(response => response.json())
}


export function fetchDeleteMaster(masterId) {
    const options = {
        method: 'DELETE',
        headers: HEADERS,
        credentials: 'include',
    }
    return fetch(`${BASE_URL}/admin/master/${masterId}`, options).then(response => response.json())
}

