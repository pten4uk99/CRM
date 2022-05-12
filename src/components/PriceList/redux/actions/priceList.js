export function SetPaintQuantity(id, quantity) {
    return {type: "SET_PAINT_QUANTITY", id: id, quantity: quantity}
}
export function SetInFavorites(id, inFavorites) {
    return {type: "SET_IN_FAVORITES", id: id, inFavorites: inFavorites}
}
