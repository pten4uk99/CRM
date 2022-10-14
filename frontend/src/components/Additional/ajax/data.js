import {fetchClientDetail, fetchCreateMaster, fetchDeleteMaster, fetchMasterList, fetchVisitServices} from "./server";
import {handleResponse} from "../../../constants";

export function getMasterList({success, clientError, serverError}) {
    fetchMasterList()
        .then(data => handleResponse({data, success, clientError, serverError}))
        .catch(error => {
            serverError(error.message)
            console.log(error)
        })
}

export function createNewMaster({masterObj, success, clientError, serverError}) {
    fetchCreateMaster(masterObj)
        .then(data => handleResponse({data, success, clientError, serverError}))
        .catch(error => {
            serverError(error.message)
            console.log(error)
        })
}

export function deleteMaster({masterId, success, clientError, serverError}) {
    fetchDeleteMaster(masterId)
        .then(data => handleResponse({data, success, clientError, serverError}))
        .catch(error => {
            serverError(error.message)
            console.log(error)
        })
}

export function clientDetail({clientId, success, clientError, serverError}) {
    fetchClientDetail({clientId})
        .then(data => handleResponse({data, success, clientError, serverError}))
        .catch(error => {
            serverError(error.message)
            console.log(error)
        })
}


export function visitServices({visitId, success, clientError, serverError}) {
    fetchVisitServices({visitId})
        .then(data => handleResponse({data, success, clientError, serverError}))
        .catch(error => {
            serverError(error.message)
            console.log(error)
        })
}
