export function AddCashPosition(position) {
    return {type: "ADD_CASH_POSITION", position: position}
}
export function RemoveCashPosition(index) {
    return {type: "REMOVE_CASH_POSITION", index: index}
}
