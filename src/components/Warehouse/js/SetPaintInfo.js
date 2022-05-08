import React from "react";
import {connect} from "react-redux";


function SetPaintInfo(props) {
    return (
        <section className="set-paint-info__block">
            <label htmlFor=""><input type="text" className="package"/></label>
            <label htmlFor=""><input type="text" className="quantity"/></label>
        </section>
    )
}

export default connect(
    state => ({store: state}),
    dispatch => ({})
)(SetPaintInfo);
