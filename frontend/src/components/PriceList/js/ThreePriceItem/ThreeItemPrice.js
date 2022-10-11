import React from "react";
import {connect} from "react-redux";


function ThreeItemPrice({priceItem, ...props}) {
    return (
        <div className="table-row three-price">
            <div className="header">
                <div className="name">{priceItem.name}</div>
                <div className="description">{priceItem.description}</div>
            </div>
            <div className="price shirt-price">{priceItem.shirt_price.price}</div>
            <div className="price middle-price">{priceItem.middle_price.price}</div>
            <div className="price long-price">{priceItem.long_price.price}</div>
        </div>
    )
}

export default connect(
    state => ({store: state}),
    dispatch => ({})
)(ThreeItemPrice);
