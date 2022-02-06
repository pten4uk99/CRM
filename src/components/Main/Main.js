import React from "react";
import {connect} from "react-redux";
import Time from "./Time";
import Masters from "./Masters/Masters";
import Clients from "./Clients/Clients";


function Main(props) {
    return (
        <main>
            <article className="journal">
                <Time/>
                <Masters/>
                <Clients/>
            </article>
        </main>
    )
}

export default connect(
    state => ({store: state.Main}),
    dispatch => ({})
)(Main);
