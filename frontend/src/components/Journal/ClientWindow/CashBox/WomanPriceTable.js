import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {AddCashPosition, RemoveCashPosition} from "../../../../redux/actions/Main/cashResult";
import {HAIR_LENGTHS} from "../../../../constants";
import WomanPriceItem from "./WomanPriceItem";
import {formatThreeItemPriceList} from "../../../PriceList/js/ThreePriceItem/ThreeItemPriceList";


function WomanPriceTable({activePriceList, ...props}) {
    let cashResult = props.store.cashResult
    let rawPriceList = activePriceList?.price_items || []
    let [priceItems, setPriceItems] = useState([])

    useEffect(() => {
        if (rawPriceList) setPriceItems(formatThreeItemPriceList(rawPriceList))
    }, [rawPriceList])

    function handleAddPosition(elem, priceObj, hair_length) {
        let newPos = {
            pk: priceObj.pk,
            name: `${elem.name} (${hair_length})`,
            price: priceObj.price
        }
        if (getCountPosInCashResult(elem, priceObj) < 5) props.AddCashPosition(newPos)
    }

    function getCountPosInCashResult(elem, priceObj) {
        let count = 0
        cashResult.forEach((position) => {
            if (position.pk === priceObj.pk) count++
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

                <div className="woman-price-list">
                    {priceItems.map((elem, index) => {
                        return <div className="row" key={index}>
                            <div className="name">{elem.name}</div>
                            <WomanPriceItem priceItem={elem}
                                            priceObj={elem.shirt_price}
                                            className='shirt'
                                            hairLength={HAIR_LENGTHS.shirt}
                                            handleAddPosition={handleAddPosition}
                                            getCountPosInCashResult={getCountPosInCashResult}/>
                             <WomanPriceItem priceItem={elem}
                                            priceObj={elem.middle_price}
                                            className='middle'
                                            hairLength={HAIR_LENGTHS.middle}
                                            handleAddPosition={handleAddPosition}
                                            getCountPosInCashResult={getCountPosInCashResult}/>
                            <WomanPriceItem priceItem={elem}
                                            priceObj={elem.long_price}
                                            className='long'
                                            hairLength={HAIR_LENGTHS.long}
                                            handleAddPosition={handleAddPosition}
                                            getCountPosInCashResult={getCountPosInCashResult}/>
                        </div>
                    })}
                </div>
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
