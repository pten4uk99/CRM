import {BASE_URL} from "../../../../constants";


const HEADERS = {
    'Content-Type': 'application/json',
}

export function fetchMasterTimetable({year, month}) {
    const options = {
        method: 'GET',
        credentials: 'include',
    }
    return fetch(`${BASE_URL}/admin/timetable/?year=${year}&month=${month}`, options)
        .then(response => response.json())
}

export function fetchSetMasterTimetable({master_id, year, month, body}) {
    const options = {
        method: 'POST',
        headers: HEADERS,
        credentials: 'include',
        body: JSON.stringify(body)
    }
    return fetch(`${BASE_URL}/admin/timetable/${master_id}?year=${year}&month=${month}`, options)
        .then(response => response.json())
}
