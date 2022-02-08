const initialState = [
    {
        master: "Саша",
        name: "Вася",
        lastName: "Василькин",
        phone: "+7(926)-986-31-49",
        date: "2021-02-03",
        timeStart: {
            hour: 15,
            minutes: "45"
        },
        timeEnd: {
            hour: 10,
            minutes: "00"
        },
        duration: 30,
        gender: "М",
        service: "Стрижка",
    },
    {
        master: "Вика",
        name: "Альбина",
        lastName: "Василькина",
        phone: "+7(925)-504-75-41",
        date: "2021-02-03",
        timeStart: {
            hour: 14,
            minutes: "30"
        },
        timeEnd: {
            hour: 15,
            minutes: "30"
        },
        duration: 60 * 4,
        gender: "Ж",
        service: "Стрижка",
    }
]

export default function clients(state = initialState, action) {
    switch (action.type) {
        default:
            return state
    }
}