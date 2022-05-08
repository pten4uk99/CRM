import React from "react";
import {connect} from "react-redux";

import Time from "./Time";
import Masters from "./Masters/Masters";


function Journal(props) {
    return (
        <article className="journal">
            <Time/>
            <Masters/>
        </article>
    )
}

export default connect(
    state => ({store: state.Main}),
    dispatch => ({})
)(Journal);
