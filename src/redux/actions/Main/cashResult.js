export function AddCashPosition(service_index, position) {
    return {type: "ADD_CASH_POSITION", service_index: service_index, position: position}
}
export function RemoveCashPosition(position) {
    return {type: "REMOVE_CASH_POSITION", position: position}
}
