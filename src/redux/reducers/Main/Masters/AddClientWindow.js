const initialState = {
    active: false,
    orientation: "active-top",
    offsetTop: 0,
    offsetLeft: 0
}

export default function AddClientWindow(state = initialState, action) {
    switch (action.type) {
        case "ACTIVATE_TO_TOP":
            return {
                ...state,
                active: true,
                orientation: "active-top",
                ...action.payload};
        case "ACTIVATE_TO_BOTTOM":
            return {
                ...state,
                active: true,
                orientation: "active-bottom",
                ...action.payload};
        case "SWAP_ACTIVE_BOTTOM":
            return {
                ...state,
                className: "add-client-window active-bottom",
                offsetTop: action.payload.offsetTop,
                offsetLeft: action.payload.offsetLeft

            };
        case "SWAP_ACTIVE_TOP":
            return {
                ...state,
                className: "add-client-window active-top",
                offsetTop: action.payload.offsetTop,
                offsetLeft: action.payload.offsetLeft
            };
        case "DEACTIVATE":
            return {...state, active: false};
        default:
            return state
    }
}