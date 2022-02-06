import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {
    ActivateBackground, SwapOrientationToBottom, SwapOrientationToTop,
} from "../../../../../redux/actions/Main/addClientWindow_actions";
import {SwapTableItemToActive, SwapToActive, SwapToInactive} from "../../../../../redux/actions/Main/masters_actions";
import AddClientWindow from "./AddClientWindow/AddClientWindow";
import Client from "./Client";


function TableItem(props) {
    const currentItem = props.store.masters[props.master][props.index];
    const clients = props.store.clients;

    let tableItem = React.useRef();
    let [currentClient, setCurrentClient] = useState(null);
    useEffect(() => {
        setCurrentClient(clients.filter((elem) => {
            return elem.master === props.master &&
                elem.timeStart.hour === currentItem.hour &&
                elem.timeStart.minutes === currentItem.minutes})[0])
    }, [])

    let [underlineClass, setUnderlineClass] = useState('underline');
    function activateUnderline() {
        setUnderlineClass('underline active');
    }
    function deactivateUnderline() {
        setUnderlineClass('underline');
    }

    return (
        <>
            {renderClient(currentClient, props, tableItem)}
            <div className={props.className}
                 onClick={(event) => activateWindow(event, props, props.index)}
                 onMouseEnter={activateUnderline} onMouseLeave={deactivateUnderline}
                 ref={tableItem}/>
            {currentItem.active ? <AddClientWindow tableItem={currentItem}
                                                   master={props.master}
                                                   index={props.index}/> : ""}
            <hr className={underlineClass} style={{width: getUnderlineLength(props.store)}}/>
        </>
    )
}

export default connect(
    state => ({store: state.Main}),
    dispatch => ({
        ActivateBackground:
            () => dispatch(ActivateBackground()),
        SwapTableItemToActive:
            (i, name) => dispatch(SwapTableItemToActive(i, name)),
        SwapOrientationToTop:
            (top, left) => dispatch(SwapOrientationToTop(top, left)),
        SwapOrientationToBottom:
            (top, left) => dispatch(SwapOrientationToBottom(top, left)),
    })
)(TableItem);

function activateWindow(event, props, index) {
    event.clientY + 370 > window.innerHeight ?
       props.SwapOrientationToTop(event.target.offsetTop, event.target.offsetLeft) :
       props.SwapOrientationToBottom(event.target.offsetTop, event.target.offsetLeft);

    props.SwapTableItemToActive(
        index,
        props.master
    );
    props.ActivateBackground()
}

function renderClient(currentClient, props, tableItem) {
    return currentClient ?
        <Client key={props.index}
                master={props.master}
                params={currentClient}
                offsetTop={tableItem.current.offsetTop}
                offsetLeft={tableItem.current.offsetLeft}/> :
        <></>
}

function getUnderlineLength(props) {
    return 15 + 222 * Object.keys(props.masters).length;
}