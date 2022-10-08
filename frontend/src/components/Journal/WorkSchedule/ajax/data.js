import {fetchMasterTimetable, fetchSetMasterTimetable} from "./server";
import {handleResponse} from "../../../../constants";


export function getMasterTimetable({year, month, success, clientError, serverError}) {
    fetchMasterTimetable({year, month})
        .then(data => handleResponse({data, success, clientError, serverError}))
        .catch(error => {
            serverError(error.message)
            console.log(error)
        })
}

export function setMasterTimetable({master_id, year, month, body, success, clientError, serverError}) {
    fetchSetMasterTimetable({master_id, year, month, body})
        .then(data => handleResponse({data, success, clientError, serverError}))
        .catch(error => {
            serverError(error.message)
            console.log(error)
        })
}
