const initialState = {
    0: [
        {
            master: "Саша",
            // клиент именно к этому мастеру
            toMaster: true,
            isDone: true,
            name: "Василевс",
            lastName: "Василькин",
            phone: "+7(926)-986-31-49",
            date: "2021-02-03",
            timeStart: {
                hour: 10,
                minutes: "45"
            },
            timeEnd: {
                hour: 11,
                minutes: "00"
            },
            duration: 30,
        },
    ]
}


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