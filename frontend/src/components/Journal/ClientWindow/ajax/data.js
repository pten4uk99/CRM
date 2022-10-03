import {fetchAddNewVisit} from "./server";
import {handleResponse} from "../../../../constants";


export function addNewVisit({formData, success, clientError, serverError}) {
    fetchAddNewVisit({formData})
        .then(data => handleResponse({data, success, clientError, serverError}))
        .catch(error => {
            serverError(error.message)
            console.log(error)
        })
}
