const initialState = {
    journal: false,
    additional: true,
    warehouse: false,
    priceList: false,
}


export default function menu(state = initialState, action) {
    switch (action.type) {
        case "ACTIVATE_ITEM":
            let newMenu = {...state}
            for (let elem in newMenu) newMenu[elem] = elem === action.item;
            return newMenu;
        default:
            return state;
    }
}