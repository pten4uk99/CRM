let initialState = [
    {
        id: 1,
        inFavorites: false,
        category: "Color Sync",
        name: "10A",
        quantity: 240,
        volume: 90,
    },
    {
        id: 2,
        inFavorites: false,
        category: "SoColor Beauty",
        name: "10B",
        quantity: 176,
        volume: 90,
    },
    {
        id: 3,
        inFavorites: false,
        category: "SoColor Beauty",
        name: "10C",
        quantity: 115,
        volume: 90,
    },
    {
        id: 4,
        inFavorites: false,
        category: "SoColor Beauty",
        name: "10D",
        quantity: 47,
        volume: 90,
    },

]

export default function paints(state=initialState, action) {
    switch (action.type) {
        case "SET_PAINT_QUANTITY":
            return state.map((elem) => {
                if (elem.id === action.id) elem.quantity = action.quantity
                return elem
            })
        case "SET_IN_FAVORITES":
            return state.map((elem) => {
                if (elem.id === action.id) elem.inFavorites = action.inFavorites
                return elem
            })
        default:
            return state
    }
}