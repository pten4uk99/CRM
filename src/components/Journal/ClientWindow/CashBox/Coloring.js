import React, {useState} from "react";
import {connect} from "react-redux";

import Materials from "./Materials";


function Coloring(props) {
    return (
        <div className="add-client-window__coloring">
            <Materials/>
            <div className="work">
                Работа:
                <textarea rows={1} className="input work-input" placeholder="Цена"/>
            </div>
        </div>
    )
}

export default connect(
    state => ({store: state}),
    dispatch => ({})
)(Coloring);
