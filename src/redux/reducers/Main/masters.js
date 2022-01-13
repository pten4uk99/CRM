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
            newObj[action.payload.name].map((elem, index) => {
                if (index === action.payload.index) {
                    elem.active = true;
                    elem.className = "table-item active";
                    elem.addClientWindow = {
                        ...elem.addClientWindow,
                        offsetTop: action.payload.offsetTop + elem.addClientWindow.offsetDiff,
                        offsetLeft: action.payload.offsetLeft
                    }
                    return elem;
                } else if (elem.active) {
                    elem.active = false;
                    elem.className = "table-item"
                    return elem;
                }
            })
            return newObj;
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