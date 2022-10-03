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
