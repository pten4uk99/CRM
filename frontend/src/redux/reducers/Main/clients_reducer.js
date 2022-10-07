const initialState = {}


export default function clients(state = initialState, action) {
    switch (action.type) {
        case "ADD_MASTER_CLIENTS":
            let newState = {...state}
            newState[action.payload.masterId] = action.payload.clients
            return newState
        case "SET_CLIENT_INFO":
            let newClientsList = state.map((elem) => {
                if (elem.master == action.master &&
                    elem.timeStart.hour == action.hour &&
                    elem.timeStart.minutes == action.minutes) {
                    return {...elem, ...action.data}
                }
                return elem
            })
            return newClientsList
        default:
            return state
    }
}