import React from "react";
import {connect} from "react-redux";

import PaintList from "./PaintList";
import WarehouseMenu from "./WarehouseMenu";


function Warehouse(props) {
    return (
        <article className="warehouse">
            <WarehouseMenu/>
            <input className="search" type="text" placeholder="Поиск..."/>
            <PaintList/>
        </article>
    )
}

export default connect(
    state => ({store: state}),
    dispatch => ({})
)(Warehouse);
