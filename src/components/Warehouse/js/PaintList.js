import React from "react";
import {connect} from "react-redux";

import Paint from "./Paint";


function PaintList(props) {
    let painArr = props.store.paints

    return (
        <ul className="paint-list">
            {painArr.map((paint, index) => <Paint key={index} data={paint}/>)}
        </ul>
    )
}

export default connect(
    state => ({store: state}),
    dispatch => ({})
)(PaintList);
