import React from "react";
import {connect} from "react-redux";


function WomanPriceItem({priceItem, className, hairLength, priceObj,
                            handleAddPosition, getCountPosInCashResult, ...props}) {

    return (
        <div className={`price ${className}`}
             onClick={() => handleAddPosition(priceItem, priceObj, hairLength)}>
            {priceObj.price}
            {getCountPosInCashResult(priceItem, priceObj) !== 0 &&
                <span className="count-pos-in-result">
                    x {getCountPosInCashResult(priceItem, priceObj)}
                </span>}
        </div>
    )
}

export default connect(
    state => ({}),
    dispatch => ({})
)(WomanPriceItem);
