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

        setOnload(props.store.components.ClientsClient);
        }, []
    )

    return onload ? (
        <div className="client" style={getStyle(tableItem, props)}>
            vjdfnvdkj
        </div>
    ) : <></>
}

export default connect(
    state => ({store: state.Main}),
    dispatch => ({})
)(Client);

function getStyle(tableItem, props) {
    return {
        top: tableItem.offsetTop,
        left: tableItem.offsetLeft,
        height: props.params.cardParams.height
    }
}