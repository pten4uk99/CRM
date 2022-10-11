import React from "react";
import {connect} from "react-redux";


function DropDown(props) {
    let data = props.data || []

    return (
        <div className="add-client-window__dropdown">
            {data.map((elem) => <div className="dropdown-elem"
                                     onClick={() => props.setInputValue(elem)}>{elem}</div>)}
        </div>
    )
}

export default connect(
    state => ({}),
    dispatch => ({})
)(DropDown);
