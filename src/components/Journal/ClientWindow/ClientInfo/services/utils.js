export function onFormSubmit(
    e, chosenMaster, chosenDuration, clientInfo, SetClientInfo, UpdateClients) {

    let form = e.target;
    let newClient = {
        master: chosenMaster !== 'Нет' ? chosenMaster : props.master,
        toMaster: chosenMaster !== 'Нет',
        name: form['first-name']?.value,
        lastName: form['last-name']?.value,
        phone: form['phone']?.value,
        timeStart: {
            hour: Number(form['start-hours']?.value),
            minutes: form['start-minutes']?.value
        },
        timeEnd: {
            hour: Number(form['end-hours']?.value),
            minutes: form['end-minutes']?.value
        },
        duration: chosenDuration,
        // gender: form['gender'].value,
        // service: form['service']?.value,
        comment: form['comment']?.value
    }
    clientInfo ?
        SetClientInfo(
            chosenMaster === 'Нет' ? props.master : chosenMaster,
            clientInfo.timeStart.hour,
            clientInfo.timeStart.minutes,
            newClient) :
        UpdateClients(newClient)
}