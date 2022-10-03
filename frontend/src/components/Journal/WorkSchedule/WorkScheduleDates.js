import React from "react";
import {connect} from "react-redux";


function WorkScheduleDates({daysInMonthList, isWeekDay, ...props}) {

    function isWeekend(weekDay) {
        return weekDay === 'сб' || weekDay === 'вс'
    }

    return (
        <div className='work-schedule__row-wrapper'>
            <div className="row head">
                <div className="master"/>
                <div className="dates">
                    {daysInMonthList.map((elem) => <div className={`cell ${isWeekend(elem.weekDay) && 'weekend'}`}
                                                        key={elem.day}>
                        {isWeekDay ? elem.weekDay : elem.day}
                    </div>)}
                </div>
            </div>
        </div>
    )
}

export default connect(
    state => ({}),
    dispatch => ({})
)(WorkScheduleDates);
