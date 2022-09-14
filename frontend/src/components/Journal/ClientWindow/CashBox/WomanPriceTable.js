import React, {useState} from "react";
import {connect} from "react-redux";
import {AddCashPosition, RemoveCashPosition} from "../../../../redux/actions/Main/cashResult";
import {HAIR_LENGTHS} from "../../../../constants";


function WomanPriceTable(props) {
    let cashResult = props.store.cashResult
    let data = props.data
    let priceList = data?.price_list || []

    function handleAddPosition(elem, hair_length) {
        let newPos = {
            name: `${elem.name} (${hair_length.hair_length})`,
            price: hair_length.price
        }
        if (getCountPosInCashResult(elem, hair_length) < 5) props.AddCashPosition(newPos)
    }

    function getCountPosInCashResult(elem, hair_length) {
        let count = 0
        cashResult.forEach((pos) => {
            if (pos.price === hair_length.price) {
                if (pos.name.includes(elem.name)) {
                    count++
                }
            }
        })
        return count
    }

    return (
        <div className="add-client-window__woman-price-table">
            <div className="table">
                <div className="row">
                    <div className="name header"/>
                    <div className="price header">{HAIR_LENGTHS.shirt}</div>
                    <div className="price header">{HAIR_LENGTHS.middle}</div>
                    <div className="price header">{HAIR_LENGTHS.long}</div>
                </div>
                {priceList.map((elem, index) => {
                    return <div className="row" key={index}>
                        <div className="name">{elem.name}</div>
                        {elem.hair_lengths.map((hair_length) => {
                            return <div className={`price ${hair_length.hair_length === HAIR_LENGTHS.shirt ? 
                                'shirt' : hair_length.hair_length === HAIR_LENGTHS.middle ?
                                    'middle' : hair_length.hair_length === HAIR_LENGTHS.long ? 
                                        'long' : ''}`}
                                        onClick={() => handleAddPosition(elem, hair_length)}>
                                {hair_length.price}
                                {getCountPosInCashResult(elem, hair_length) !== 0 &&
                                    <span className="count-pos-in-result">
                                        x {getCountPosInCashResult(elem, hair_length)}
                                    </span>}
                            </div>
                        })}
                    </div>
                })}
            </div>
        </div>
    )
}

export default connect(
    state => ({store: state}),
    dispatch => ({
        AddCashPosition: (service_index, pos) => dispatch(AddCashPosition(service_index, pos)),
        RemoveCashPosition: (pos) => dispatch(RemoveCashPosition(pos)),
    })
)(WomanPriceTable);
