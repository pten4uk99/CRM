import React from "react";
import {connect} from "react-redux";
import {swapItemToCashBox, swapItemToJournal, swapItemToWarehouse} from "../../redux/actions/Header/Menu";

function Menu(props) {
    let menu = props.Menu

    return (
        <nav className="header__main-menu">
            <div className={`cashbox ${menu.cashbox && "active"}`} onClick={props.swapItemToCashBox}>Касса</div>
            <div className={`journal ${menu.journal && "active"}`} onClick={props.swapItemToJournal}>Журнал</div>
            <div className={`warehouse ${menu.warehouse && "active"}`} onClick={props.swapItemToWarehouse}>Склад</div>
        </nav>
    )
}

export default connect(
    state => ({Menu: state.Header.Menu}),
    dispatch => ({
        swapItemToCashBox: () => dispatch(swapItemToCashBox()),
        swapItemToJournal: () => dispatch(swapItemToJournal()),
        swapItemToWarehouse: () => dispatch(swapItemToWarehouse())
    })
)(Menu);

