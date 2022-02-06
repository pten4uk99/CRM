import React, {useEffect} from "react";

import Header from "./Header/Header";
import Main from "./Main/Main";
import {connect} from "react-redux";
import {ActivateComponent} from "../redux/actions/Main/components_actions";


function App(props) {
    useEffect(() => {
        sequenceRenderComponents(props)
    }, [])

    return (
        <div className="wrapper">
            <Header/>
            <Main/>
        </div>
    )
}

export default connect(
    state => ({store: state.Main.components}),
    dispatch => ({
        ActivateComponent:
            (component) => dispatch(ActivateComponent(component))
    })
)(App);

function sequenceRenderComponents(props) {
    const componentSequence = [
        "Main",
        "Time",
        "Masters",
        "MastersMaster",
        "MastersMasterTableItem",
        // "Clients",
        // "ClientsClient",
        "MastersMasterTableItemAddClientWindow",
        "MastersMasterTableItemAddClientWindowTime"
    ]
    for (let component of componentSequence) {
        props.ActivateComponent(component);
    }
}