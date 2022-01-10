const initialState = {
    className: "add-client-window",
}

export default function AddClientWindow(state = initialState, action) {
    switch (action.type) {
        case "SWAP_ACTIVE_BOTTOM":
            return {...state, className: "add-client-window active-bottom"}
        case "SWAP_ACTIVE_TOP":
            return {...state, className: "add-client-window active-top"}
        case "DEACTIVATE":
            return {...state, className: "add-client-window"}
        default:
            return state
    }
}