export function UpdateClients(data) {
    return {type: "UPDATE_CLIENTS", payload: data}
}
export function SetClientInfo(master, hour, minutes, data) {
    return {
        type: "SET_CLIENT_INFO",
        master: master,
        hour: hour,
        minutes: minutes,
        data: data
    }
}
