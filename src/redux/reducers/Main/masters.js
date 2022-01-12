const initialState = {}


export default function masters(state = initialState, action) {
    let newObj = {...state};
    switch (action.type) {
        case "ADD_MASTER":
            newObj[action.payload.name] = listElems().map(
                    (index) => {
                        let o;
                        index >= 16 ?
                            o = "active-top" :
                            o = "active-bottom"
                        return {
                            active: false,
                            className: "table-item",
                            addClientWindow: {
                                orientation: o,
                                offsetTop: 0,
                                offsetLeft: 0
                            }
                        }
                    }
                )
            return newObj;
        case "SWAP_TO_ACTIVE":
            newObj[action.payload.name].map((elem, index) => {
                if (index === action.payload.index) {
                    return {
                        active: true,
                        classname: "table-item active",
                        addClientWindow: {
                            ...elem.addClientWindow,
                            offsetTop: action.payload.offsetTop,
                            offsetLeft: action.payload.offsetLeft
                        }
                    };
                } else if (elem.active) {
                    elem.active = false;
                    elem.className = "table-item"
                }
                return elem;
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