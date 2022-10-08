import {PRICE_LIST_TYPE} from "../../../../constants";

let initialState = [
    // {
    //     name: 'Мужской зал',
    //     type: PRICE_LIST_TYPE.one_price_item,
    //     price_items: [
    //         {
    //             pk: 1,
    //             name: 'Бублики',
    //             description: 'Жуплики',
    //             price: 600
    //         }
    //     ]
    // },
    // {
    //     name: 'Женский зал',
    //     type: PRICE_LIST_TYPE.three_price_item,
    //     price_items: [
    //         // {
    //         //     pk: 1,
    //         //     name: 'Еще бублик',
    //         //     description: 'Еще жуплик',
    //         //     shirt_price: 600,
    //         //     middle_price: 800,
    //         //     long_price: 1000
    //         // }
    //     ]
    // }
]


export default function priceList(state = initialState, action) {
    switch (action.type) {
        default:
            return state
    }
}