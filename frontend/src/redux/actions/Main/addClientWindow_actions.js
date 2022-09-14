export const ActivateBackground = () => {
    return {type: "ACTIVATE_BACKGROUND"}
}
export const DeactivateBackground = () => {
    return {type: "DEACTIVATE_BACKGROUND"}
}
export const SwapOrientationToTop = (top, left) => {
    return {
        type: "SWAP_ORIENTATION_TO_TOP",
        payload: {
            offsetTop: top,
            offsetLeft: left
        }
    }
}
export const SwapOrientationToBottom = (top, left) => {
    return {
        type: "SWAP_ORIENTATION_TO_BOTTOM",
        payload: {
            offsetTop: top,
            offsetLeft: left
        }
    }
}
export const SetChosenDuration = (duration) => {
    return {type: "SET_CHOSEN_DURATION", payload: duration}
}

