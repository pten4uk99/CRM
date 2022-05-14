import React, {useState} from "react";
import {connect} from "react-redux";

import MastersBlock from "./MastersBlock";
import CashBlock from "./CashBlock";
import {ActivateAdditionalItem} from "../redux/actions/additional";


function Additional(props) {
    let buttons = props.store.additional

    return (
        <article className="additional">

            <div className="menu-block">
                <button className={`block-button ${buttons.masters && "active"}`}
                        onClick={() => props.ActivateAdditionalItem('masters')}>Мастера</button>
                <button className={`block-button ${buttons.cashBox && "active"}`}
                        onClick={() => props.ActivateAdditionalItem('cashBox')}>Касса</button>
            </div>

            {buttons.masters && <MastersBlock/>}
            {buttons.cashBox && <CashBlock/>}
        </article>
    )
}

export default connect(
    state => ({store: state}),
    dispatch => ({
        ActivateAdditionalItem: (item) => dispatch(ActivateAdditionalItem(item)),
    })
)(Additional);
