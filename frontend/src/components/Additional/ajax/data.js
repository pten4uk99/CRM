import {fetchCreateMaster, fetchDeleteMaster, fetchMasterList} from "./server";
import {handleResponse, STATUS_RESPONSE} from "../../../constants";
import {adaptMasterList} from "./adapters";

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
