export const AddMaster = ({pk, name, lastName}) => {
    return {type: "ADD_MASTER", payload: {pk: pk, name: name, lastName: lastName}}
}
export const SwapTableItemToActive = (masterId, index) => {
    return {
        type: "SWAP_TABLE_ITEM_TO_ACTIVE",
        payload: {
            masterId: masterId,
            index: index,
        }
    }
}
export const SwapTableItemToInactive = (masterId, index) => {
    return {type: "SWAP_TABLE_ITEM_TO_INACTIVE", payload: {masterId: masterId, index: index}}
}

export const SetAddClientWindowMastersList = (mastersLIst) => {
    return {type: "SET_ADD_CLIENT_WINDOW_MASTERS_LIST", payload: mastersLIst}
}
