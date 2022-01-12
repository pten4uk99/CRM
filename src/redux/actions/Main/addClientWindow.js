export const ActivateWindowToTop = (offsetTop, offsetLeft, name, index) => {
    return {
        type: "ACTIVATE_TO_TOP",
        payload: {
            offsetTop: offsetTop - 307,
            offsetLeft: offsetLeft,
            master: name,
            indexItem: index
        }
    }
}
export const ActivateWindowToBottom = (offsetTop, offsetLeft, name, index) => {
    return {
        type: "ACTIVATE_TO_BOTTOM",
        payload: {
            offsetTop: offsetTop + 15,
            offsetLeft: offsetLeft
        }
    }
}