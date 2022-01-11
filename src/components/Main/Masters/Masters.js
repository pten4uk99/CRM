import React from "react";
import {connect} from "react-redux";
import Master from "./Master";
import AddClientWindow from "./AddClientWindow";


function Masters(props) {
    return (
        <section className="masters">
            <Master name="Саша" />
            <Master name="Вика" />
            <Master name="Ира" />
            {props.store.active ? <AddClientWindow/> : ""}
        </section>
    )
}

export default connect(
    state => ({store: state.Main.Masters.AddClientWindow}),
    dispatch => ({})
)(Masters);
