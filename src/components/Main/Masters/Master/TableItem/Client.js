import React, {useEffect, useState} from "react";
import {connect} from "react-redux";

function Client(props) {
    let [onload, setOnload] = useState(false);
    let [tableItem, setTableItem] = useState(null);
    let currentClient = props.store.masters[props.master];

    useEffect(() => {
        setTableItem(currentClient.filter((elem) => {
            return elem.hour === props.params.timeStart.hour &&
                elem.minutes === props.params.timeStart.minutes})[0])

        setOnload(true);
        }, []
    )

    return onload ? (
        <div className="client" style={getStyle(props)}>
            vjdfnvdkj
        </div>
    ) : <></>
}

export default connect(
    state => ({store: state.Main}),
    dispatch => ({})
)(Client);

function getStyle(props) {
    console.log(props.params)
    return {
        top: props.offsetTop,
        left: props.offsetLeft,
        height: props.params.duration / 15 * 25
    }
}