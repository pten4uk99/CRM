import {fetchAddNewVisit, fetchDeleteVisit, fetchEditVisit, fetchGetClientList, fetchSetClientStatus} from "./server";
import {handleResponse} from "../../../../constants";


export function addNewVisit({formData, success, clientError, serverError}) {
    fetchAddNewVisit({formData})
        .then(data => handleResponse({data, success, clientError, serverError}))
        .catch(error => {
            serverError(error.message)
            console.log(error)
        })
}

export function editVisit({visitId, formData, success, clientError, serverError}) {
    fetchEditVisit({visitId, formData})
        .then(data => handleResponse({data, success, clientError, serverError}))
        .catch(error => {
            serverError(error.message)
            console.log(error)
        })
}

export function getClientList({name, lastName, phone, success, clientError, serverError}) {
    fetchGetClientList({name, lastName, phone})
        .then(data => handleResponse({data, success, clientError, serverError}))
        .catch(error => {
            serverError(error.message)
            console.log(error)
        })
}

export function setVisitStatus({visitId, status, success, clientError, serverError}) {
    fetchSetClientStatus({visitId, status})
        .then(data => handleResponse({data, success, clientError, serverError}))
        .catch(error => {
            serverError(error.message)
            console.log(error)
        })
}

export function deleteVisit({visitId, body, success, clientError, serverError}) {
    fetchDeleteVisit({visitId, body})
        .then(data => handleResponse({data, success, clientError, serverError}))
        .catch(error => {
            serverError(error.message)
            console.log(error)
        })
}
