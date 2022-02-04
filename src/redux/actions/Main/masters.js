export const AddMaster = (name) => {
    return {type: "ADD_MASTER", payload: {name: name}}
}
export const SwapToActive = (index, name) => {
    return {
        type: "SWAP_TO_ACTIVE",
        payload: {
            name: name,
            index: index,
        }
    }
}
export const SwapToInactive = (name, index) => {
    return {type: "SWAP_TO_INACTIVE", payload: {name: name, index: index}}
}