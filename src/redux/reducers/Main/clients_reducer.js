const initialState = {
    noMaster: [],
    masters: {
        "Саша": [
            {
                name: "Вася",
                lastName: "Василькин",
                phone: "+7(926)-986-31-49",
                date: "2021-02-03",
                timeStart: {
                    hour: 9,
                    minutes: "30"
                },
                timeEnd: {
                    hour: 10,
                    minutes: "00"
                },
                duration: 30,
                gender: "М",
                service: "Стрижка",
                cardParams: {
                    height: 30 / 15 * 25,
                }
            }
        ],
    }
}

export default function clients(state = initialState, action) {
    switch (action.type) {
        default:
            return state
    }
}