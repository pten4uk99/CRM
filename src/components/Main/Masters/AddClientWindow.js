import React from "react";
import {connect} from "react-redux";


function AddClientWindow(props) {
    return (
        <div className={props.store.className}>
            dkcmsl
        </div>
    )
}

export default connect(
    state => ({store: state.Main.Masters.AddClientWindow}),
    dispatch => ({})
)(AddClientWindow);