import React, {useEffect} from "react";

import {connect} from "react-redux";


function Time(props) {
    return (
        <div className="time">
            <div className="time-range">
                <div className="time-start">
                    <input className="hours" type="text" value={props.hoursStart} readOnly={true}/>
                    <span className="colon">:</span>
                    <input className="minutes" type="text" value={props.minutesStart} readOnly={true}/>
                </div>
                <span className="minus">-</span>
                <div className="time-end">
                    <input className="hours" type="text" value={props.hoursEnd} readOnly={true}/>
                    <span className="colon">:</span>
                    <input className="minutes" type="text" value={props.minutesEnd} readOnly={true}/>
                </div>
            </div>
            <div className="change-time">
                <span className="minus">-</span>
                <span className="quantity">30 мин.</span>
                <span className="plus">+</span>
            </div>
        </div>
    )
}

export default connect(
    state => ({store: state.Main.addClientWindow}),
    dispatch => ({})
)(Time);


function forbidWord(event) {
    const re = /[^\d]/g;
    if (re.test(event.key) && event.key.length === 1) event.preventDefault();
}