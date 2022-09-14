let initialState = [
    {
        category: "Мужской зал",
        positions: [
            {
                name: "Мытье головы",
                description: "(тут должно быть описание этого продукта)",
                price: "50"
            },
        ],
    },
    {
        category: "Женский зал",
        positions: [
            {name: "Стрижка недооцененная", price: "20"},
            {name: "Стрижка переоцененная", price: "15680"},
        ],
    },
]

export default function priceList(state=initialState, action) {
    switch (action.type) {
        default:
            return state
    }
}