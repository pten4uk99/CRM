import React, {useEffect, useState} from "react";
import {connect} from "react-redux";

import leftArrow from "/src/assets/img/left-arrow.svg"
import rightArrow from "/src/assets/img/right-arrow.svg"
import {DateTime} from "luxon";
import WorkScheduleDates from "../WorkScheduleDates";
import WorkScheduleMaster from "../WorkScheduleMaster";
import {MONTHS} from "../../../../constants";




function WorkSchedulePresentation({mastersList, year, month, setYear, setMonth, setMasterWorkDays, ...props}) {
    let [daysInMonthList, setDaysInMonthList] = useState(getDatesList(year, month))
    let mastersListIsEmpty = Boolean(mastersList.length === 0)

    useEffect(() => {
        setDaysInMonthList(getDatesList(year, month))
    }, [month, year])

    function setCurrentMonth(newMonth) {
        if (newMonth < 1) {
            setYear(year - 1)
            setMonth(12)
        } else if (newMonth > 12) {
            setYear(year + 1)
            setMonth(1)
        } else setMonth(newMonth)
    }

    function getDatesList(year, month) {
        let date = DateTime.local(year, month)
        let arr = []

        for (let day = 1; day <= date.daysInMonth; day++) {
            let newDate = DateTime.local(year, month, day)
            arr.push({day: day, weekDay: newDate.weekdayShort})
        }
        return arr
    }

    if (mastersListIsEmpty) return <div className='work-schedule__empty-list'>Список мастеров пуст</div>
    return (
        <section className="work-schedule__block">
            <div className="header">
                <img src={leftArrow} alt="назад" onClick={() => setCurrentMonth(month - 1)}/>
                <div className="month">{MONTHS[month]} {year}</div>
                <img src={rightArrow} alt="вперед" onClick={() => setCurrentMonth(month + 1)}/>
            </div>

            <div className="table">
                <WorkScheduleDates isWeekDay={true} daysInMonthList={daysInMonthList}/>
                <WorkScheduleDates daysInMonthList={daysInMonthList}/>

                <br/>

                {mastersList.map(master => <WorkScheduleMaster name={master?.name}
                                                               lastName={master?.last_name}
                                                               key={master.pk}
                                                               master_id={master.pk}
                                                               daysInMonthList={daysInMonthList}
                                                               setMasterTimetable={setMasterWorkDays}
                                                               workDaysList={master.work_days}/>)}
            </div>
        </section>
    )
}

export default connect(
    state => ({store: state.Main}),
    dispatch => ({})
)(WorkSchedulePresentation);
