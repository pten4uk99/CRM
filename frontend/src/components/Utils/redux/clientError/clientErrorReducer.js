const initialState = {
    active: false,
    detail: '',
}


export default function clientError(state = initialState, action) {
    switch (action.type) {
        case "SET_CLIENT_ERROR_DETAIL":
            return {...state, detail: action.detail, active: true}
        case "CLEAR_CLIENT_ERROR_DETAIL":
            return {...state, detail: '', active: false}
        default:
            return state;
    }
}
