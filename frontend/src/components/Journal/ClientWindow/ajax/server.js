import {BASE_URL} from "../../../../constants";


const HEADERS = {
    'Content-Type': 'multipart/form-data',
}

export function fetchAddNewVisit({formData}) {
    const options = {
        method: 'POST',
        credentials: 'include',
        body: formData
    }
    return fetch(`${BASE_URL}/admin/visits`, options)
        .then(response => response.json())
}

export function fetchEditVisit({visitId, formData}) {
    const options = {
        method: 'PUT',
        credentials: 'include',
        body: formData
    }
    return fetch(`${BASE_URL}/admin/visits/${visitId}`, options)
        .then(response => response.json())
}

export function fetchGetClientList({name, lastName, phone}) {
    const options = {
        method: 'GET',
        credentials: 'include',
    }
    return fetch(`${BASE_URL}/admin/clients/?name=${name}&last_name=${lastName}&phone=${phone}`, options)
        .then(response => response.json())
}

export function fetchSetClientStatus({visitId, status}) {
    const options = {
        method: 'GET',
        credentials: 'include',
    }
    return fetch(`${BASE_URL}/admin/visit/${visitId}/set_status?status=${status}`, options)
        .then(response => response.json())
}


export function fetchDeleteVisit({visitId, body}) {
    const options = {
        method: 'PUT',
        credentials: 'include',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    }
    return fetch(`${BASE_URL}/admin/visit/${visitId}/delete`, options)
        .then(response => response.json())
}
