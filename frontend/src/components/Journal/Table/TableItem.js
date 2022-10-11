import React, {useEffect, useState} from "react";
import {connect} from "react-redux";

import {
    SetAddClientWindowActive, SetClientInfoActive,
    SetDefaultMaster,
    SetDefaultTimeStart,
    SetTableItemId
} from "../../../redux/actions/Main/addClientWindow_actions";
import {SwapTableItemToActive} from "../../../redux/actions/Main/masters_actions";
import Client from "./Client";


function TableItem({master, requestMastersWithVisits, ...props}) {
    const currentItem = props.store.masters[master.pk].tableItems[props.index];
    const clients = props.store.clients[master.pk];

    let [currentClient, setCurrentClient] = useState(null);

    let timeStart = currentClient ? getTime(currentClient.time_start) : null
    let timeEnd = currentClient ? getTime(currentClient.time_end) : null

    function getTime(time) {
        let formatted = time.split(':')
        return {
            hour: Number(formatted[0]),
            minutes: Number(formatted[1])
        }
    }

    useEffect(() => {
        setCurrentClient(clients.filter((elem) => {
            let elemTimeStart = getTime(elem.time_start)
            return elem.master.pk === master.pk &&
                Number(elemTimeStart.hour) === Number(currentItem.hour) &&
                Number(elemTimeStart.minutes) === Number(currentItem.minutes)})[0])
    }, [clients])

    let [underlineClass, setUnderlineClass] = useState('underline');
    function activateUnderline() {
        setUnderlineClass('underline active');
    }
    function deactivateUnderline() {
        setUnderlineClass('underline');
    }

    function activateWindow() {
        props.SetClientInfoActive(true)
        props.SetTableItemId(props.index)
        props.SetDefaultTimeStart(Number(currentItem.hour), Number(currentItem.minutes))
        props.SetDefaultMaster(master.pk, master.name, master.last_name)
        props.SwapTableItemToActive(master.pk, props.index)
        props.SetAddClientWindowActive(true)
    }

    function getUnderlineLength(props) {
        return 15 + 222 * Object.keys(props.masters).length;
    }

    return (
        <>
            {currentClient && <Client key={props.index}
                                      master={master}
                                      timeStart={timeStart}
                                      timeEnd={timeEnd}
                                      clientInfo={currentClient}
                                      requestMastersWithVisits={requestMastersWithVisits}
                                      onClick={(event) => activateWindow(event, props, props.index)}/>}

            <div className={props.className}
                 onClick={activateWindow}
                 onMouseEnter={activateUnderline} onMouseLeave={deactivateUnderline}/>

            {props.index % 4 === 0 ? <hr className="bold-border"/> : <></>}
            <hr className={underlineClass} style={{width: getUnderlineLength(props.store)}}/>
        </>
    )
}

export default connect(
    state => ({store: state.Main}),
    dispatch => ({
        SetClientInfoActive: (active) => dispatch(SetClientInfoActive(active)),
        SetTableItemId: (id) => dispatch(SetTableItemId(id)),
        SetDefaultMaster: (pk, name, lastName) => dispatch(SetDefaultMaster(pk, name, lastName)),
        SetDefaultTimeStart: (hour, minutes) => dispatch(SetDefaultTimeStart(hour, minutes)),
        SetAddClientWindowActive: (active) => dispatch(SetAddClientWindowActive(active)),
        SwapTableItemToActive: (i, name) => dispatch(SwapTableItemToActive(i, name)),
    })
)(TableItem);
