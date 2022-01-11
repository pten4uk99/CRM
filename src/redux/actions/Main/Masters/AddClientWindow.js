export const ActivateWindowToTop = (offsetTop, offsetLeft) => {
    return {
        type: "ACTIVATE_TO_TOP",
        payload: {
            offsetTop: offsetTop,
            offsetLeft: offsetLeft
        }
    }
}
export const ActivateWindowToBottom = (offsetTop, offsetLeft) => {
    return {
        type: "ACTIVATE_TO_BOTTOM",
        payload: {
            offsetTop: offsetTop,
            offsetLeft: offsetLeft
        }
    }
}
export const DeactivateWindow = () => {
    return {type: "DEACTIVATE"}
}