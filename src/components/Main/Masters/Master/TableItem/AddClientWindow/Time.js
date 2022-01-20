import React, {useEffect} from "react";

import {connect} from "react-redux";


function Time(props) {
    const time = React.useRef();

    useEffect(() => {

    }, [time])
    return (
        <div className="time">
            <input className="hours" type="text" ref={time} value="15" readOnly={true}/>
            <input className="minutes" type="text" ref={time} value="30" readOnly={true}/>
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