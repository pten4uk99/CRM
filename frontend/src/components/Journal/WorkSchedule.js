import React, {useState} from "react";
import {connect} from "react-redux";

import leftArrow from "/src/assets/img/left-arrow.svg"
import rightArrow from "/src/assets/img/right-arrow.svg"
import {DateTime} from "luxon";
import {MONTHS} from "../../constants";

function WorkSchedule(props) {
    let [year, setYear] = useState(2022)
    let [month, setMonth] = useState(7)

    let mastersList = ['Саша', 'Марина', 'Ангелина']

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
        for (let i = 1; i <= date.daysInMonth; i++) arr.push(i)
        return arr
    }

    return (
        <section className="work-schedule__block">
            <div className="header">
                <img src={leftArrow} alt="назад" onClick={() => setCurrentMonth(month - 1)}/>
                <div className="month">{MONTHS[month]}</div>
                <img src={rightArrow} alt="вперед" onClick={() => setCurrentMonth(month + 1)}/>
            </div>

            <div className="table">

                <div className="row head">
                    <div className="master"/>
                    <div className="dates">
                        {getDatesList(year, month).map((elem) => {
                            return <div className="cell" key={elem}>{elem}</div>
                        })}
                    </div>
                </div>

                {mastersList.map((master, index) => {
                    return <div className="row" key={index}>
                        <div className="master">{master}</div>
                        <div className="dates">
                            {getDatesList(year, month).map((elem) => {
                                return <div className="cell" key={elem}
                                            onClick={(e) => e.target.style.backgroundColor = 'green'}/>
                            })}
                        </div>
                    </div>
                })}
            </div>
        </section>
    )
}

export default connect(
    state => ({store: state.Main}),
    dispatch => ({})
)(WorkSchedule);
