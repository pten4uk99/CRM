const initialState = {
    className: "background",
    chosenDuration: 30
}

export default function addClientWindow(state = initialState, action) {
    switch (action.type) {
        case "ACTIVATE_BACKGROUND":
            return {...state, className: "background active"}
        case "DEACTIVATE_BACKGROUND":
            return {...state, className: "background"}
        case "SWAP_ORIENTATION_TO_TOP":
            return {
                ...state,
                orientation: "active-top",
                offsetTop: action.payload.offsetTop - 315,
                offsetLeft: action.payload.offsetLeft
            }
        case "SWAP_ORIENTATION_TO_BOTTOM":
            return {
                ...state,
                orientation: "active-bottom",
                offsetTop: action.payload.offsetTop - 10,
                offsetLeft: action.payload.offsetLeft
            }
        case "SET_CHOSEN_DURATION":
            return {...state, chosenDuration: action.payload}
        default:
            return state
    }
}