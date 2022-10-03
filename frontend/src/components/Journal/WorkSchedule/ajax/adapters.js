import {MasterWithWorkDaysObj} from "../types/master";


export function adaptMasterTimetable(data) { // data: Array
    let result = []
    for (let elem of data) result.push(
        new MasterWithWorkDaysObj(elem.pk, elem.name, elem.last_name, elem.work_days)
    )
    return result
}