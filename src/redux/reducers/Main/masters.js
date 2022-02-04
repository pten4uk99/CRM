const initialState = {}


export default function masters(state = initialState, action) {
    let newObj = {...state};
    switch (action.type) {
        case "ADD_MASTER":
            newObj[action.payload.name] = listElems().map(
                (index) => {
                    return {
                        active: false,
                        className: "table-item",
                        addClientWindow: {
                            offsetTop: 0,
                            offsetLeft: 0
                        }
                    }
                })
            return newObj;
        case "SWAP_TO_ACTIVE":
            const elem = newObj[action.payload.name][action.payload.index];
            newObj[action.payload.name][action.payload.index] = {
                active: true,
                className: "table-item active",
                addClientWindow: {
                    ...elem.addClientWindow,
                }
            }
            return newObj;
        case "SWAP_TO_INACTIVE":
            const obj = newObj[action.payload.name][action.payload.index];
            newObj[action.payload.name][action.payload.index] = {
                active: false,
                className: "table-item",
                addClientWindow: obj.addClientWindow
            }
            return newObj;
        default:
            return state
    }
}


function listElems() {
    let list = [];
    for (let i = 1; i <= 13 * 4; i++) list.push(i);
    return list;
}