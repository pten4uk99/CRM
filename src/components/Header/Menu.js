import React from "react";
import {connect} from "react-redux";
import {swapItemToCashBox, swapItemToJournal, swapItemToWarehouse} from "../../redux/actions/Header/Menu";

function Menu(props) {
    let getClassName = (name) => props.Menu[name];
    return (
        <nav>
            <div className={getClassName('cashbox')} onClick={props.swapItemToCashBox}>Касса</div>
            <div className={getClassName('journal')} onClick={props.swapItemToJournal}>Журнал</div>
            <div className={getClassName('warehouse')} onClick={props.swapItemToWarehouse}>Склад</div>
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

