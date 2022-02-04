import React from "react";
import {connect} from "react-redux";


function Time(props) {
    return (
        <section className="time">
            <div className="hours">
                {getHours().map(elem => <div className="hour" key={elem}>{elem}</div>)}
            </div>
            <div className="minutes">
                {getMinutes().map((elem, index) => <div className="minute" key={index}>{elem}</div>)}
            </div>
        </section>
    )
}

export default connect(
    state => ({store: state}),
    dispatch => ({})
)(Time);

function getHours() {
    let list = [];
    for (let i = 9; i < 22; i++) list.push(i);
    return list;
}

function getMinutes() {
    let list = [];
    let numbers = ['00', '15', '30', '45'];

    for (let i = 1; i <= 13; i++) {
        list.push(...numbers);
    }

    return list;
}