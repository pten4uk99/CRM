const initialState = {}


export default function masters(state = initialState, action) {
    let newObj = {...state};
    switch (action.type) {
        case "ADD_MASTER":
            newObj[action.payload.name] = listElems().map(
                (index) => {
                    let orientation;
                    let diff;
                    if (index >= 16) {
                        orientation = "active-top";
                        diff = -307;
                    } else {
                        orientation = "active-bottom";
                        diff = 15;
                    }
                    return {
                        active: false,
                        className: "table-item",
                        addClientWindow: {
                            orientation: orientation,
                            offsetDiff: diff,
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
                    offsetTop: action.payload.offsetTop + elem.addClientWindow.offsetDiff,
                    offsetLeft: action.payload.offsetLeft
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
    for (let i=1; i <= 26; i++) list.push(i);
    return list;
}