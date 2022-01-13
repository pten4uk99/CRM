const initialState = {
    className: "background"
}

export default function addClientWindow(state = initialState, action) {
    switch (action.type) {
        case "ACTIVATE_BACKGROUND":
            return {className: "background active"}
        case "DEACTIVATE_BACKGROUND":
            return {className: "background"}
        default:
            return state
    }
}