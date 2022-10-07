import React from "react";
import {connect} from "react-redux";


function OneItemPrice({priceItem, ...props}) {
    return (
        <div className="table-row">
            <div className="header">
                <div className="name">{priceItem.name}</div>
                <div className="description">{priceItem.description}</div>
            </div>
            <div className="price">{priceItem.price}</div>
        </div>
    )
}

export default connect(
    state => ({store: state}),
    dispatch => ({})
)(OneItemPrice);
