export const AddMaster = (name) => {
    return {type: "ADD_MASTER", payload: {name: name}}
}
export const SwapTableItemToActive = (index, name) => {
    return {
        type: "SWAP_TABLE_ITEM_TO_ACTIVE",
        payload: {
            name: name,
            index: index,
        }
    }
}
export const SwapTableItemToInactive = (name, index) => {
    return {type: "SWAP_TABLE_ITEM_TO_INACTIVE", payload: {name: name, index: index}}
}

