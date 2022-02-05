const initialState = {
    className: "background"
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
                offsetTop: action.payload.offsetTop - 307,
                offsetLeft: action.payload.offsetLeft
            }
        case "SWAP_ORIENTATION_TO_BOTTOM":
            return {
                ...state,
                orientation: "active-bottom",
                offsetTop: action.payload.offsetTop + 15,
                offsetLeft: action.payload.offsetLeft
            }
        default:
            return state
    }
}