const initialState = {
    active: false,
}


export default function modalWindow(state = initialState, action) {
    switch (action.type) {
        case "SET_ACTIVE_MODAL_WINDOW":
            return {...state, active: action.active}
        default:
            return state;
    }
}
