import {fetchAddOnePriceItem, fetchAddPriceListCategory, fetchAddThreePriceItem, fetchGetPriceLists} from "./server";
import {handleResponse} from "../../../constants";


export function addPriceListCategory({body, success, clientError, serverError}) {
    fetchAddPriceListCategory({body})
        .then(data => handleResponse({data, success, clientError, serverError}))
        .catch(error => {
            serverError(error.message)
            console.log(error)
        })
}

export function getPriceLists({success, clientError, serverError}) {
    fetchGetPriceLists({})
        .then(data => handleResponse({data, success, clientError, serverError}))
        .catch(error => {
            serverError(error.message)
            console.log(error)
        })
}

export function addOnePriceItem({body, success, clientError, serverError}) {
    fetchAddOnePriceItem({body})
        .then(data => handleResponse({data, success, clientError, serverError}))
        .catch(error => {
            serverError(error.message)
            console.log(error)
        })
}

export function addThreePriceItem({body, success, clientError, serverError}) {
    fetchAddThreePriceItem({body})
        .then(data => handleResponse({data, success, clientError, serverError}))
        .catch(error => {
            serverError(error.message)
            console.log(error)
        })
}
