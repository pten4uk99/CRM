import React from "react";
import {connect} from "react-redux";
import tableItem from "./Masters/Master/TableItem/TableItem";

function Client(props) {
    let currentClient = props.store.masters[props.master];
    let tableItem;

     currentClient ?
        tableItem = currentClient.filter((elem) => {
            return elem.hour === props.params.timeStart.hour &&
                elem.minutes === props.params.timeStart.minutes})[0] :
        tableItem = {
            offsetTop: 0,
            offsetLeft: 0
        }

    function getStyle() {
        return {
            top: tableItem.offsetTop,
            left: tableItem.offsetLeft,
            height: currentClient.cardParams.height
        }
    }

    return (
        <div className="client" style={currentClient ? getStyle() : null}>
            vjdfnvdkj
        </div>
    )
}

export default connect(
    state => ({store: state.Main}),
    dispatch => ({})
)(Client);
