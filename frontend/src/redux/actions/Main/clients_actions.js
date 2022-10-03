export function AddMasterClients(masterId, clients) {
    return {type: "ADD_MASTER_CLIENTS", payload: {masterId: masterId, clients: clients}}
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
