let initialState = []

export default function cashResult(state=initialState, action) {
    switch (action.type) {
        case "ADD_CASH_POSITION":
            return [...state, action.position]
        case "REMOVE_CASH_POSITION":
            return state.filter((elem, index) => index !== action.index)
        default:
            return state
    }
}