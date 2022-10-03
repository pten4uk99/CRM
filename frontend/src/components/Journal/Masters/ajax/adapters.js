import {Visit, WorkDayMaster} from "../types/workDay";

export function adaptWorkDayMasters(mastersVisitsList) {
    let newMastersVisits = []

    for (let masterVisit of mastersVisitsList) {
        let master = masterVisit.master
        let visits = masterVisit.visits

        let newMaster = new WorkDayMaster({pk: master.pk, name: master.name, last_name: master.last_name})

        let newVisits = []

        for (let visit of visits) {
            newVisits.push(new Visit())
        }

        newMastersVisits.push({
            master: newMaster,
            visits: newVisits
        })
    }

    return newMastersVisits
}