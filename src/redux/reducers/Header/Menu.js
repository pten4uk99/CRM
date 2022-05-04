const initialState = {
    cashbox: true,
    journal: false,
    warehouse: false
}


export default function Menu(state = initialState, action) {
    switch (action.type) {
        case "CASHBOX_ACTIVE":
            return {
                ...state,
                cashbox: true,
                journal: false,
                warehouse: false
            };
        case "JOURNAL_ACTIVE":
            return {
                ...state,
                cashbox: false,
                journal: true,
                warehouse: false
            };
        case "WAREHOUSE_ACTIVE":
            return {
                ...state,
                cashbox: false,
                journal: false,
                warehouse: true
            };
        default:
            return state;
    }
}