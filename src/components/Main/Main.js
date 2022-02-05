import React from "react";
import {connect} from "react-redux";
import Time from "./Time";
import Masters from "./Masters/Masters";
import Client from "./Client";


function Main(props) {
    return (
        <main>
            <article className="journal">
                <Time/>
                <Masters/>
                <Client master="Саша" params={props.store.clients.masters["Саша"][0]}/>
            </article>
        </main>
    )
}

export default connect(
    state => ({store: state.Main}),
    dispatch => ({})
)(Main);
