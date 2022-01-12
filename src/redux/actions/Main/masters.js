export const AddMaster = (name) => {
    return {type: "ADD_MASTER", payload: {name: name}}
}
export const SwapToActive = (index, name, offsetTop, offsetLeft) => {
    return {
        type: "SWAP_TO_ACTIVE",
        payload: {
            name: name,
            index: index,
            offsetTop: offsetTop,
            offsetLeft: offsetLeft
        }
    }
}
export const SwapToInactive = (index, name) => {
    return {type: "SWAP_TO_INACTIVE", payload: {name: name, index: index}}
}