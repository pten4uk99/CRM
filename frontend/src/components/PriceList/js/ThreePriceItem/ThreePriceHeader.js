import React from "react";
import {connect} from "react-redux";


function ThreePriceHeader({...props}) {
    return (
        <div className="table-row three-price header">
            <div className="header">
                <div className="name">Наименование позиции</div>
            </div>
            <div className="price shirt-price">Кор</div>
            <div className="price middle-price">Ср</div>
            <div className="price long-price">Дл</div>
        </div>
    )
}

export default connect(
    state => ({store: state}),
    dispatch => ({})
)(ThreePriceHeader);
