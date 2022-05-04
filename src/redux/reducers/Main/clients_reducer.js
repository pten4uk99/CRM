const initialState = [
    {
        master: "Саша",
        // клиент именно к этому мастеру
        toMaster: true,
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
        gender: "М",
        service: "Стрижка",
    },
    {
        master: "Вика",
        // клиенту не важно к какому мастеру
        toMaster: false,
        name: "Екатерина",
        lastName: "Василькина",
        phone: "+7(925)-504-75-41",
        date: "2021-02-03",
        timeStart: {
            hour: 9,
            minutes: "30"
        },
        timeEnd: {
            hour: 15,
            minutes: "30"
        },
        duration: 60 * 4,
        gender: "Ж",
        service: "Стрижка",
        comment: "Стрижка мужская с бородой",
        lastVisit: {
            service: "Окрашивание",
            date: "1 Мая 2022 г.",
            time: "15:35",
            duration: 90
        }
    }
]

export default function clients(state = initialState, action) {
    switch (action.type) {
        case "UPDATE_CLIENTS":
            return [...state, action.payload]
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