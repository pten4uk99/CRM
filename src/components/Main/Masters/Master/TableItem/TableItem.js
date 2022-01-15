import React from "react";
import {connect} from "react-redux";
import {
    ActivateBackground,
} from "../../../../../redux/actions/Main/addClientWindow";
import {SwapToActive, SwapToInactive} from "../../../../../redux/actions/Main/masters";
import AddClientWindow from "./AddClientWindow";


function TableItem(props) {
    const currentItem = props.store.masters[props.master][props.index]
    return (
        <>
            <div className={props.className}
                 onClick={(event) => activateWindow(event, props, props.index)}/>
            {currentItem.active ? <AddClientWindow tableItem={currentItem}
                                                   master={props.master}
                                                   index={props.index}/> : ""}
        </>
    )
}

export default connect(
    state => ({store: state.Main}),
    dispatch => ({
         ActivateBackground:
            () => dispatch(ActivateBackground()),
        SwapToActive:
            (i, name, offsetTop, offsetLeft) => dispatch(SwapToActive(i, name, offsetTop, offsetLeft)),
        SwapToInactive:
            (i) => dispatch(SwapToInactive(i))
    })
)(TableItem);

function activateWindow(event, props, index) {
    props.SwapToActive(
        index,
        props.master,
        event.target.offsetTop,
        event.target.offsetLeft
    );
    props.ActivateBackground()
}