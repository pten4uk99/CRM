import React, {useState} from "react";
import {connect} from "react-redux";
import {AddCashPosition, RemoveCashPosition} from "../../../../redux/actions/Main/cashResult";


function WomanPriceTable(props) {
    let data = props.data
    let priceList = data?.price_list || []

    let hairLengths = {
        shirt: 'Кор',
        middle: 'Ср',
        long: 'Дл'
    }

    function handleAddPosition(elem, price, hairLength) {
        let newPos = {
            name: `${elem.name} (${hairLength})`,
            price: price
        }
        if (!props.chosenPosition) {
            props.AddCashPosition(data.service_index, newPos)
            props.setChosenPosition(newPos)
        }
    }
    return (
        <div className="add-client-window__woman-price-table">
            <div className="table">
                <div className="row">
                    <div className="name header"/>
                    <div className="price header">{hairLengths.shirt}</div>
                    <div className="price header">{hairLengths.middle}</div>
                    <div className="price header">{hairLengths.long}</div>
                </div>
                {priceList.map((elem) => {
                    return <div className="row">
                        <div className="name">{elem.name}</div>
                        <div className="price shirt"
                             onClick={() => handleAddPosition(elem, elem.priceShirt, hairLengths.shirt)}>
                            {elem.priceShirt}
                        </div>
                        <div className="price middle"
                             onClick={() => handleAddPosition(elem, elem.priceMiddle, hairLengths.middle)}>
                            {elem.priceMiddle}
                        </div>
                        <div className="price long"
                             onClick={() => handleAddPosition(elem, elem.priceLong, hairLengths.long)}>
                            {elem.priceLong}
                        </div>
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
