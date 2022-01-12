import React from "react";
import {connect} from "react-redux";
import Master from "./Master/Master";


function Masters(props) {
    return (
        <section className="masters">
            <Master name="Саша" />
            <Master name="Вика" />
            <Master name="Ира" />
        </section>
    )
}

export default connect(
    state => ({store: state.Main.addClientWindow}),
    dispatch => ({})
)(Masters);
