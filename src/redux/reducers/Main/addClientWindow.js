const initialState = {
    orientation: "active-top",
    offsetTop: 0,
    offsetLeft: 0
}

export default function addClientWindow(state = initialState, action) {
    switch (action.type) {
        case "ACTIVATE_TO_TOP":
            return {
                ...state,
                orientation: "active-top",
                offsetTop: action.payload.offsetTop,
                offsetLeft: action.payload.offsetLeft
            };
        case "ACTIVATE_TO_BOTTOM":
            return {
                ...state,
                orientation: "active-bottom",
                offsetTop: action.payload.offsetTop,
                offsetLeft: action.payload.offsetLeft
            };
        default:
            return state
    }
}