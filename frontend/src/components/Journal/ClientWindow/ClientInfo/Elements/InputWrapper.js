import React from "react";
import {connect} from "react-redux";

function InputWrapper({classNameModifier, ...props}) {
    return (
        <div className={`input-wrapper ${classNameModifier}`}>
            {props.children}
        </div>
    )
}

export default connect(
    state => ({store: state}),
    dispatch => ({}),
)(InputWrapper)