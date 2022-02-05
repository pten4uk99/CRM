import React from "react";
import {connect} from "react-redux";

function Client(props) {

    return (
        <div className="client">
            vjdfnvdkj
        </div>
    )
}

export default connect(
    state => ({store: state.Main}),
    dispatch => ({})
)(Client);
