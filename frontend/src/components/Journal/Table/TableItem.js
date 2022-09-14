import React, {useEffect, useState} from "react";
import {connect} from "react-redux";

import {ActivateBackground} from "../../../redux/actions/Main/addClientWindow_actions";
import {SwapTableItemToActive} from "../../../redux/actions/Main/masters_actions";
import AddClientWindow from "../ClientWindow/AddClientWindow";
import Client from "./Client";


function TableItem(props) {
    const currentItem = props.store.masters[props.master][props.index];
    const clients = props.store.clients;

    let [currentClient, setCurrentClient] = useState(null);

    useEffect(() => {
        setCurrentClient(clients.filter((elem) => {
            return elem.master === props.master &&
                Number(elem.timeStart.hour) === Number(currentItem.hour) &&
                Number(elem.timeStart.minutes) === Number(currentItem.minutes)})[0])
    }, [clients])

    let [underlineClass, setUnderlineClass] = useState('underline');
    function activateUnderline() {
        setUnderlineClass('underline active');
    }
    function deactivateUnderline() {
        setUnderlineClass('underline');
    }

    return (
        <>
            {currentClient && <Client key={props.index}
                                      master={props.master}
                                      params={currentClient}
                                      onClick={(event) => activateWindow(event, props, props.index)}/>}

            <div className={props.className}
                 onClick={(event) => activateWindow(event, props, props.index)}
                 onMouseEnter={activateUnderline} onMouseLeave={deactivateUnderline}/>
            {currentItem.active ? <AddClientWindow tableItem={currentItem}
                                                   master={props.master}
                                                   index={props.index}
                                                   clientInfo={currentClient}/> : ""}
            {props.index % 4 === 0 ? <hr className="bold-border"/> : <></>}
            <hr className={underlineClass} style={{width: getUnderlineLength(props.store)}}/>
        </>
    )
}

export default connect(
    state => ({store: state.Main}),
    dispatch => ({
        ActivateBackground: () => dispatch(ActivateBackground()),
        SwapTableItemToActive: (i, name) => dispatch(SwapTableItemToActive(i, name)),
    })
)(TableItem);

function activateWindow(event, props, index) {
    props.SwapTableItemToActive(index, props.master);
    props.ActivateBackground()
}


function getUnderlineLength(props) {
    return 15 + 222 * Object.keys(props.masters).length;
}