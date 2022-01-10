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

    for (let i = 1; i <= 26; i++) {
        if (i % 2 === 0) list.push('30');
        else list.push('00');
    }

    return list;
}