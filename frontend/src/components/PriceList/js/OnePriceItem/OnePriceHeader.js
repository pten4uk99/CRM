import React from "react";
import {connect} from "react-redux";


function OnePriceHeader({...props}) {
    return (
        <div className="table-row header">
            <div className="header">
                <div className="name">Наименование позиции</div>
            </div>
            <div className="price">Цена</div>
        </div>
    )
}

export default connect(
    state => ({store: state}),
    dispatch => ({})
)(OnePriceHeader);
