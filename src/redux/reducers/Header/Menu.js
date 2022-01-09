const initialState = {
    cashbox: "cashbox active",
    journal: "journal",
    warehouse: "warehouse"
}


export default function Menu(state = initialState, action) {
    switch (action.type) {
        case "CASHBOX_ACTIVE":
            return {
                ...state,
                cashbox: "cashbox active",
                journal: "journal",
                warehouse: "warehouse"
            };
        case "JOURNAL_ACTIVE":
            return {
                ...state,
                cashbox: "cashbox",
                journal: "journal active",
                warehouse: "warehouse"
            };
        case "WAREHOUSE_ACTIVE":
            return {
                ...state,
                cashbox: "cashbox",
                journal: "journal",
                warehouse: "warehouse active"
            };
        default:
            return state;
    }
}