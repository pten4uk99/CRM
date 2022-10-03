import React, {useEffect, useState} from "react";
import {connect} from "react-redux";


function WorkScheduleMaster({master_id, name, lastName, daysInMonthList, workDaysList, setMasterTimetable, ...props}) {
    let [workDaysChanged, setWorkDaysChanged] = useState(false)
    let [workDays, setWorkDays] = useState([...workDaysList])

    useEffect(() => {
        setWorkDays(workDaysList)
    }, [workDaysList])

    useEffect(() => {
        if (isEquals(workDays, workDaysList)) setWorkDaysChanged(false)
        else setWorkDaysChanged(true)
    }, [workDays])

    function isWorkDay(day) {
        return workDays.includes(day)
    }

    function isEquals(arr1, arr2) {
        if (arr2.length !== arr1.length) return false
        for (let elem of arr1) {
            if (!arr2.includes(elem)) return false
        }
        return true
    }

    function handleClick(day) {
        if (isWorkDay(day)) setWorkDays(workDays.filter(elem => elem !== day))
        else setWorkDays([...workDays, day])
    }

    function onSave(masterId, newWorkDays) {
        setMasterTimetable({master_id: masterId, newWorkDays: newWorkDays})
    }

    function onCancel() {
        setWorkDays(workDaysList)
        setWorkDaysChanged(false)
    }

    return (
        <div className='work-schedule__row-wrapper'>
            <div className="row" style={workDaysChanged ? {boxShadow: '0 0 5px rgba(0, 0, 0, .3)'} : {}}>
                <div className="master">{name.slice(0, 1)}. {lastName}</div>
                <div className="dates">
                    {daysInMonthList.map((elem) => <div className={`cell ${isWorkDay(elem.day) && 'active'}`}
                                                        key={elem.day}
                                                        onClick={() => handleClick(elem.day)}/>)}
                </div>
            </div>

            {workDaysChanged &&
                <div className="buttons-block">
                    <button className='work-schedule__button'
                            onClick={() => onSave(master_id, workDays)}>Сохранить изменения</button>
                    <button className='work-schedule__button' onClick={onCancel}>Отмена</button>
                </div>}
        </div>
    )
}

export default connect(
    state => ({}),
    dispatch => ({})
)(WorkScheduleMaster);
