import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import OneItemPrice from "./OneItemPrice";
import ThreeItemPrice from "./ThreeItemPrice";


function PriceList(props) {
    let priceList = props.store.priceList
    let categories = Object.keys(priceList)
    let [chosenCategory, setChosenCategory] = useState(null)
    let [priceItems, setPriceItems] = useState([])

    let isOnePriceItem = priceItems[0]?.price
    let isThreePriceItem = priceItems[0]?.shirt_price || priceItems[0]?.middle_price || priceItems[0]?.long_price

    useEffect(() => {
        if (chosenCategory) setPriceItems(priceList[chosenCategory]?.price_items)
    }, [chosenCategory])


    return (
        <article className="price-list">
            <div className="block__categories">
                {categories.map((elem) => <h1 key={elem}
                                              className={`category ${chosenCategory === elem && "active"}`}
                                              onClick={() => setChosenCategory(elem)}>{priceList[elem].name}</h1>)}
            </div>

            <div className="table">
                {priceItems.map((elem, index) => {
                    if (isOnePriceItem) return <OneItemPrice key={index} priceItem={elem}/>
                    else if (isThreePriceItem) return <ThreeItemPrice key={index} priceItem={elem}/>
                })}
            </div>
        </article>
    )
}

export default connect(
    state => ({store: state}),
    dispatch => ({})
)(PriceList);
