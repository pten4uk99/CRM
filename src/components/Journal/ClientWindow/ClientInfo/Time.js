import React, {useEffect, useState} from "react";

import {connect} from "react-redux";

import plus from '/src/assets/img/journal/journal-plus.svg'
import minus from '/src/assets/img/journal/journal-minus.svg'
import {SetChosenDuration} from "../../../../redux/actions/Main/addClientWindow_actions";


function Time(props) {
    let duration = props.store.chosenDuration
    let [hourStart, setHourStart] = useState(getValue(props.hoursStart));
    let [minutesStart, setMinutesStart] = useState(getValue(props.minutesStart));
    let [hourEnd, setHourEnd] = useState("00");
    let [minutesEnd, setMinutesEnd] = useState("00");

    function calculateEndTime(startHours, startMinutes) {
        let startSeconds = startHours * 3600 + startMinutes * 60
        let endSeconds = startSeconds + duration * 60
        setHourEnd(String(Math.trunc(endSeconds / 3600)).padStart(2, '0'))
        setMinutesEnd(String(Math.trunc((endSeconds % 3600) / 60)).padStart(2, '0'))
    }

    useEffect(() => {
        calculateEndTime(hourStart, minutesStart)
    }, [duration, hourStart, minutesStart])

    useEffect(() => {
        props.clientInfo ?
            props.SetChosenDuration(props.clientInfo.duration) :
            props.SetChosenDuration(30)
    }, [])

    useEffect(() => {
        if (props.clientInfo) {
            setHourStart(props.clientInfo.timeStart.hour)
            setMinutesStart(props.clientInfo.timeStart.minutes)
            setHourEnd(props.clientInfo.timeEnd.hour)
            setMinutesEnd(props.clientInfo.timeEnd.minutes)
        }
    }, [props.clientInfo])

    function handleChange(e, {max, setValue, setNextValue}) {
        let value = e.target.value
        let [first, second] = String(max)

        if (isNaN(Number(value)) || (value.length === 1 && value[0] > first)) return
        else if (value.length === 2) {
            if (!(value[0] > first || value[1] > second)) setValue(value)
        }
        else if (value.length > 2) {
            if (e.target.nextSibling) {
                let next = e.target.nextSibling.nextSibling
                next.focus()
                setNextValue(value[2])
            }
        }
        else setValue(value)
    }

    function handleBlur(e, value) {
        if (!e.target.value) e.target.value = String(value).padStart(2, '0')
    }

    function handleFocus(e) {
        if (e.target.value.length === 2) e.target.value = ''
    }

    function handleSetDuration(newDuration) {
        if (newDuration >= 15 && newDuration <= 720) props.SetChosenDuration(newDuration)
    }

    function getValue(value) {
        return String(value).padStart(2, '0')
    }

    return (
        <div className="time">
            <div className="time-range">
                <div className="time-start">
                    <input className="hours"
                           name="start-hours"
                           type="text"
                           value={hourStart}
                           onFocus={(e) => {handleFocus(e)}}
                           onBlur={(e) => handleBlur(e, props.hoursStart)}
                           onChange={e => handleChange(
                               e, {max: 24, setValue: setHourStart, setNextValue: setMinutesStart})}/>
                    <span className="colon">:</span>
                    <input className="minutes"
                           name="start-minutes"
                           type="text"
                           value={minutesStart}
                           onFocus={(e) => {handleFocus(e)}}
                           onBlur={(e) => handleBlur(e, props.minutesStart)}
                           onChange={e => handleChange(e, {max: 59, setValue: setMinutesStart})}/>
                </div>
                <span className="minus">-</span>
                <div className="time-end">
                    <input className="hours"
                           name="end-hours"
                           type="text"
                           value={hourEnd}
                           onFocus={(e) => {handleFocus(e)}}
                           onBlur={(e) => handleBlur(e, props.hoursStart)}
                           onChange={e => handleChange(
                               e, {max: 24, setValue: setHourEnd, setNextValue: setMinutesEnd})}/>
                    <span className="colon">:</span>
                    <input className="minutes"
                           name="end-minutes"
                           type="text"
                           value={minutesEnd}
                           onFocus={(e) => {handleFocus(e)}}
                           onBlur={(e) => handleBlur(e, props.minutesStart)}
                           onChange={e => handleChange(e, {max: 59, setValue: setMinutesEnd})}/>
                </div>
            </div>
            <div className="change-time">
                <img className='minus' src={minus} onClick={() => handleSetDuration(duration - 15)} alt="минус"/>
                <span className="quantity">
                    {duration >= 60 ? `${Math.trunc(duration / 60)} ч.` : ""} {duration % 60} мин.
                </span>
                <img className='plus' src={plus} onClick={() => handleSetDuration(duration + 15)} alt="плюс"/>
            </div>
        </div>
    )
}

export default connect(
    state => ({store: state.Main.addClientWindow}),
    dispatch => ({
        SetChosenDuration: (duration) => dispatch(SetChosenDuration(duration)),
    })
)(Time);


function forbidWord(event) {
    const re = /[^\d]/g;
    if (re.test(event.key) && event.key.length === 1) event.preventDefault();
}