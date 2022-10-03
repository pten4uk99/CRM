import {fetchMastersWithVisits} from "./server";
import {handleResponse} from "../../../../constants";


export function getMastersWithVisits({year, month, day, success, clientError, serverError}) {
    fetchMastersWithVisits({year, month, day})
        .then(data => handleResponse({data, success, clientError, serverError}))
        .catch(error => {
            serverError(error.message)
            console.log(error)
        })
}
