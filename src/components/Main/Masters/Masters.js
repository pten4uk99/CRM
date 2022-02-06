import React, {useEffect} from "react";
import {connect} from "react-redux";
import Master from "./Master/Master";
import {ActivateComponent} from "../../../redux/actions/Main/components_actions";


function Masters(props) {
    useEffect(() => {
        props.ActivateComponent("Clients")
        props.ActivateComponent("ClientsClient")
    })
    return (
        <>
            <div className="masters-line">

            </div>
            <section className="masters">
                <Master name="Саша" />
                <Master name="Вика" />
                <Master name="Ира" />
            </section>
        </>

    )
}

export default connect(
    state => ({store: state.Main.addClientWindow}),
    dispatch => ({
        ActivateComponent:
            (component) => dispatch(ActivateComponent(component))
    })
)(Masters);
