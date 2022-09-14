let initialState = {
    masters: false,
    cashBox: false,
    clients: false,
}

export default function additional(state=initialState, action) {
    switch (action.type) {
        case "ACTIVATE_ADDITIONAL_ITEM":
            let newMenu = {...state}
            for (let elem in newMenu) newMenu[elem] = elem === action.item ? !newMenu[elem] : false;
            return newMenu;
        default:
            return state;
    }
}