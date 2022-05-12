import React from "react";
import {connect} from "react-redux";

import Journal from "./Journal/Journal";
import Warehouse from "./Warehouse/js/Warehouse";
import PriceList from "./PriceList/js/PriceList";
import Additional from "./Additional/js/Additional";


function Main(props) {
    let menu = props.store.Header.menu

    return (
        <main>
            {menu.journal && <Journal/>}
            {menu.warehouse && <Warehouse/>}
            {menu.priceList && <PriceList/>}
            {menu.additional && <Additional/>}
        </main>
    )
}

export default connect(
    state => ({store: state}),
    dispatch => ({})
)(Main);
