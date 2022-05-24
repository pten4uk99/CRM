let initialState = []

export default function cashResult(state=initialState, action) {
    switch (action.type) {
        case "ADD_CASH_POSITION":
            for (let elem of state) {
                if (elem.name === action.position.name) return state
            }
            return [
                ...state,
                {
                    ...action.position,
                    service_index: action.service_index
                }]
        case "REMOVE_CASH_POSITION":
            return state.filter((elem) => action.position.name !== elem.name)
        default:
            return state
    }
}