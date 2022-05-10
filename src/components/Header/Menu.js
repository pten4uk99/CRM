import React from "react";
import {connect} from "react-redux";

import journal from "/src/assets/img/header/journal.svg"
import journalWhite from "/src/assets/img/header/journal-white.svg"
import warehouse from "/src/assets/img/header/warehouse.svg"
import warehouseWhite from "/src/assets/img/header/warehouse-white.svg"
import {swapItemToCashBox, swapItemToJournal, swapItemToWarehouse} from "../../redux/actions/Header/Menu";


function Menu(props) {
    let menu = props.store.Header.menu

    return (
        <nav className="header__main-menu">
            <div className={`journal ${menu.journal && "active"}`} onClick={props.swapItemToJournal}>
                <img src={menu.journal ? journal : journalWhite} alt="Журнал"/>
            </div>
            <div className={`warehouse ${menu.warehouse && "active"}`} onClick={props.swapItemToWarehouse}>
                <img src={menu.warehouse ? warehouse : warehouseWhite} alt="Склад"/>
            </div>
        </nav>
    )
}

export default connect(
    state => ({store: state}),
    dispatch => ({
        swapItemToCashBox: () => dispatch(swapItemToCashBox()),
        swapItemToJournal: () => dispatch(swapItemToJournal()),
        swapItemToWarehouse: () => dispatch(swapItemToWarehouse())
    })
)(Menu);

