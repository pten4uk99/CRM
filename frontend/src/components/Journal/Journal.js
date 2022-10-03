import React, {useState} from "react";
import {connect} from "react-redux";

import calendarMonth from "/src/assets/img/journal/calendar-month.svg"
import calendarDate from "/src/assets/img/journal/calendar-date.svg"
import DayDetail from "./DayDetail";
import WorkScheduleRequest from "./WorkScheduleRequest";


function Journal(props) {
    let [isDay, setIsDay] = useState(true);

    return (
        <article className="journal">

            {isDay ?
                <>
                    <img className="date-icon"
                         src={calendarDate}
                         alt="день"
                         onClick={() => setIsDay(false)}/>
                    <div className="journal-wrapper">

                        <DayDetail/>
                    </div>
                </> :
                <>
                    <img className="date-icon"
                         src={calendarMonth}
                         alt="месяц"
                         onClick={() => setIsDay(true)}/>

                    <div className="journal-wrapper">
                        <WorkScheduleRequest/>
                    </div>
                </>}
        </article>
    )
}

export default connect(
    state => ({store: state.Main}),
    dispatch => ({})
)(Journal);
