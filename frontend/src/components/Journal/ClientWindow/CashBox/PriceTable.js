import React from "react";
import {connect} from "react-redux";
import {AddCashPosition, RemoveCashPosition} from "../../../../redux/actions/Main/cashResult";
import WomanPriceTable from "./WomanPriceTable";
import {PRICE_LIST_TYPE} from "../../../../constants";


function PriceTable({activePriceList, ...props}) {
    let cashResult = props.store.cashResult
    let priceItems = activePriceList?.price_items || []

    function handleAddPosition(elem) {
        if (getCountPosInCashResult(elem) < 5) props.AddCashPosition(elem)
    }

    function getCountPosInCashResult(elem) {
        let count = 0
        cashResult.forEach((pos) => {
            if (pos.pk === elem.pk) count++
        })
        return count
    }

    return (
        <div className="add-client-window__price-table">
            {activePriceList?.type === PRICE_LIST_TYPE.one_price_item &&
                <div className="table">
                    {priceItems.map((elem, index) => <div className="row" key={index}>
                        <div className="name">{elem.name}</div>
                        <div className="price" onClick={() => handleAddPosition(elem)}>
                            {elem.price}
                            {getCountPosInCashResult(elem) !== 0 &&
                                <span className="count-pos-in-result">
                                    x {getCountPosInCashResult(elem)}
                                </span>}
                        </div>
                    </div>)}
                </div>}
            {activePriceList?.type === PRICE_LIST_TYPE.three_price_item &&
                <WomanPriceTable activePriceList={activePriceList}/>}
        </div>
    )
}

export default connect(
    state => ({store: state}),
    dispatch => ({
        AddCashPosition: (pos) => dispatch(AddCashPosition(pos)),
        RemoveCashPosition: (pos) => dispatch(RemoveCashPosition(pos)),
    })
)(PriceTable);
