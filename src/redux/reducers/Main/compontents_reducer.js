const initialState = {
    Main: false,
    Time: false,
    Clients: false,
    ClientsClient: false,
    Masters: false,
    MastersMaster: false,
    MastersMasterTableItem: false,
    MastersMasterTableItemAddClientWindow: false,
    MastersMasterTableItemAddClientWindowTime: false
}

export default function components(state = initialState, action) {
    switch (action.type) {
        case "SWAP_ACTIVE_TO_TRUE":
            let component = action.payload.component;
            return {...state, [component]: true}
        default:
            return state
    }
}