import React, {useEffect} from "react";
import {connect} from "react-redux";
import {refreshTime} from "../../redux/actions/Header/CurrentData";


function CurrentData(props) {

    useEffect(() => {
        setInterval(() => props.refreshTime(), 1000*30)
    }, [])

    let hours = props.store.hours;
    let minutes = props.store.minutes < 10 ? `0${props.store.minutes}` : props.store.minutes;

    return (
        <section className="current-data">
            <div className="current-time">{hours}<span>:</span>{minutes}</div>
        </section>
    )
}

export default connect(
    state => ({store: state.Header.CurrentData}),
    dispatch => ({
        refreshTime: () => dispatch(refreshTime())
    })
)(CurrentData);