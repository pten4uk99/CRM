import React, {useEffect, useState} from "react";
import {connect} from "react-redux";


function Time(props) {
    let [timeIndex, setTimeIndex] = useState(null)

    useEffect(() => {
        function getNow() {
            let now = new Date;
            getMinutes().map((elem, index) => {
                let hour = index / 4 + 9
                if (now.getHours() === Math.trunc(hour)) {
                    let minutes = now.getHours() * 60 + Number(elem)
                    let nowMinutes = now.getHours() * 60 + now.getMinutes()
                    console.log('------------------------------')
                    console.log('Минута:', elem)
                    console.log(hour, now.getHours())
                    console.log(minutes, nowMinutes)
                    console.log('------------------------------')
                    if (nowMinutes >= minutes && nowMinutes <= minutes + 15) setTimeIndex(index)
                }
            })
        }
        getNow()
        setInterval(getNow, 1000 * 2)
    }, [])

    return (
        <section className="time">
            <div className="hours">
                {getHours().map(elem => <div className="hour" key={elem}>{elem}</div>)}
            </div>
            <div className="minutes">
                {getMinutes().map((elem, index) => <div className="minute"
                                                        style={timeIndex === index ?
                                                            {background: 'red', color: 'white'} : {}}
                                                        key={index}>{elem}</div>)}
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