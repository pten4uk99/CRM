import {fetchCreateMaster, fetchMasterList} from "./server";
import {STATUS_RESPONSE} from "../../../constants";
import {adaptMasterList} from "./adapters";

export function getMasterList(setMasterList) {
    fetchMasterList()
        .then(data => {
            if (data.status === STATUS_RESPONSE.success) setMasterList(adaptMasterList(data.data))
            else if (data.status === STATUS_RESPONSE.error) console.log('ERROR', data)
        })
        .catch(error => console.log(error))
}

export function createNewMaster({masterObj, error}) {
    fetchCreateMaster(masterObj)
        .then(data => {
            if (data?.status === STATUS_RESPONSE.error) error(data.detail)
        })
        .catch(error => console.log(error))
}