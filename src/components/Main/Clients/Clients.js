import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import Client from "./Client";

function Clients(props) {
    let [onload, setOnload] = useState(false);
    useEffect(() => {
        setOnload(true);
        }, []
    )

    return onload ? (
        <div className="clients">
            {Object.entries(props.store.clients.masters).map((master) => {
            return props.store.clients.masters[master[0]].map((client, index) => {
                return <Client key={index} master={master[0]} params={client}/>
            })
        })}
        </div>
    ) : <></>
}

export default connect(
    state => ({store: state.Main}),
    dispatch => ({})
)(Clients);
