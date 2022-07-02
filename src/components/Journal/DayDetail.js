import React from "react";
import {connect} from "react-redux";

import Time from "./Time";
import Masters from "./Masters/Masters";


function DayDetail(props) {
    return (
        <section className="day-detail__block">
            <Time/>
            <Masters/>
        </section>
    )
}

export default connect(
    state => ({store: state}),
    dispatch => ({})
)(DayDetail);
