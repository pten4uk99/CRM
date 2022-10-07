let initialState = {
    0: {
        name: 'Мужской зал',
        price_items: [
            {
                name: 'Стрижка невероятная',
                description: 'Стрижка бубликовская',
                price: 600
            },
            {
                name: 'Стрижка вероятная',
                description: 'Вероятность 65%',
                price: 700
            },
        ],
    },
    1: {
        name: 'Женский зал',
        price_items: [
            {
                name: 'Стрижка бублосинская',
                description: 'Да это та самая бублосинская стрижка',
                shirt_price: 400,
                middle_price: 600,
                long_price: 800
            },
            {
                name: 'Стрижка керамическая',
                description: 'Цемент в подарок',
                shirt_price: 700,
                middle_price: 800,
                long_price: 900
            },
        ]
    }
}


export default function priceList(state = initialState, action) {
    switch (action.type) {
        default:
            return state
    }
}