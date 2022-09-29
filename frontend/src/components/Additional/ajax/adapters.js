import {MasterObj} from "../types/master";

export function adaptMasterList(data) { // data: Array
    let result = []
    for (let master of data) result.push(new MasterObj(master.pk, master.name, master.last_name))
    return result
}