import React from "react";
import {connect} from "react-redux";

import Journal from "./Journal/Journal";
import Warehouse from "./Warehouse/js/Warehouse";


function Main(props) {
    let menu = props.store.Header.menu

    return (
        <main>
            {menu.journal && <Journal/>}
            {menu.warehouse && <Warehouse/>}
        </main>
    )
}

export default connect(
    state => ({store: state}),
    dispatch => ({})
)(Main);
