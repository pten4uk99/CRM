const initialState = {
    active: false,
    detail: '',
}


export default function serverError(state = initialState, action) {
    switch (action.type) {
        case "SET_SERVER_ERROR_DETAIL":
            return {...state, detail: action.detail, active: true}
        case "CLEAR_SERVER_ERROR_DETAIL":
            return {...state, detail: '', active: false}
        default:
            return state;
    }
}
