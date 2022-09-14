import React, {useState} from "react";
import {connect} from "react-redux";


function Price(props) {
    return (
        <section className="price">
            <h1>{props.category}</h1>

        </section>
    )
}

export default connect(
    state => ({store: state}),
    dispatch => ({})
)(Price);
