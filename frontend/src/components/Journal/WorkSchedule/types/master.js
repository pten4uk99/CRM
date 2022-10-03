export class MasterWithWorkDaysObj {
    constructor(pk, name, last_name, work_days = null) {
        this.pk = Number(pk)
        this.name = String(name)
        this.last_name = String(last_name)
        this.work_days = work_days
    }
}
