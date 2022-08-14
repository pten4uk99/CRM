import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {AddCashPosition, RemoveCashPosition} from "../../../../redux/actions/Main/cashResult";
import WomanPriceTable from "./WomanPriceTable";


function PriceTable(props) {
    let cashResult = props.store.cashResult
    let data = props.data
    let priceList = data?.price_list || []
    let service = data?.header

    function handleAddPosition(elem) {
        if (getCountPosInCashResult(elem) < 5) props.AddCashPosition(elem)
    }
    function getCountPosInCashResult(elem) {
        let count = 0
        cashResult.forEach((pos) => {
            if (pos.price === elem.price) {
                if (pos.name.includes(elem.name)) {
                    count++
                }
            }
        })
        return count
    }

    return (
        <div className="add-client-window__price-table">
            {service === 'Мужской зал' &&
                <div className="table">
                    {priceList.map((elem, index) => {
                        return <div className="row" key={index}>
                            <div className="name">{elem.name}</div>
                            <div className="price" onClick={() => handleAddPosition(elem)}>
                                {elem.price}
                                {getCountPosInCashResult(elem) !== 0 &&
                                    <span className="count-pos-in-result">
                                        x {getCountPosInCashResult(elem)}
                                    </span>}
                            </div>
                        </div>
                    })}
                </div>}
            {service === 'Женский зал' && <WomanPriceTable data={data}/>}
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
