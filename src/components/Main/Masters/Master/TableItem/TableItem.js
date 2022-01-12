import React from "react";
import {connect} from "react-redux";
import {ActivateWindowToBottom, ActivateWindowToTop} from "../../../../../redux/actions/Main/addClientWindow";
import {SwapToActive, SwapToInactive} from "../../../../../redux/actions/Main/masters";
import AddClientWindow from "./AddClientWindow";


function TableItem(props) {
    console.log(props.store.masters[props.master][props.index].active)
    return (
        <>
            <div className={props.className}
                 onClick={(event) => activateWindow(event, props, props.index)}/>
            {props.store.masters[props.master][props.index].active ?
                <AddClientWindow/> : ""}
        </>
    )
}

export default connect(
    state => ({store: state.Main}),
    dispatch => ({
         ActivateWindowToTop:
            (top, left) => dispatch(ActivateWindowToTop(top, left)),
        ActivateWindowToBottom:
            (top, left) => dispatch(ActivateWindowToBottom(top, left)),
        SwapToActive:
            (i, name, offsetTop, offsetLeft) => dispatch(SwapToActive(i, name, offsetTop, offsetLeft)),
        SwapToInactive:
            (i) => dispatch(SwapToInactive(i))
    })
)(TableItem);

function activateWindow(event, props, index) {
    console.log("1")
    props.SwapToActive(index, props.master, event.target.offsetTop, event.target.offsetLeft);
    // console.log("2")
    // index >= 16 ?
    //     props.ActivateWindowToTop(event.target.offsetTop, event.target.offsetLeft, props.name, index) :
    //     props.ActivateWindowToBottom(event.target.offsetTop, event.target.offsetLeft);
    // console.log("3")
}