const initialState = {}

export default function Master(state = initialState, action) {
    switch (action.type) {
        case "ADD_MASTER":
            let newObj = {...state};
            newObj[action.payload] = listElems().map(
                    () => {
                        return {className: "table-item"}
                    }
                )
            return newObj;
        case "SWAP_TO_ACTIVE":
            newObj = {...state};
            return [
                newObj[action.payload.name].map((elem, index) => {
                    if (index === action.payload.index) {
                        elem.className = "table-item active"
                    }
                    return elem
                })
            ];
        case "SWAP_TO_INACTIVE":
            return {
                ...state,
                className: "table-item",
            };
        default:
            return state
    }
}


function listElems() {
    let list = [];
    for (let i=1; i <= 26; i++) list.push(i);
    return list;
}