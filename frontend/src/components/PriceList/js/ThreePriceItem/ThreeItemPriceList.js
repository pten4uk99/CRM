import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import ThreeItemPrice from "./ThreeItemPrice";
import ThreePriceHeader from "./ThreePriceHeader";
import AddThreePriceItemModal from "./AddThreePriceItemModal";
import {SetActiveModalWindow} from "../../../Utils/redux/modalWindow/modalWindowAction";


function OneItemPriceList({chosenCategory, requestPriceLists, ...props}) {
    let rawPriceItems = chosenCategory?.price_items
    let [priceItems, setPriceItems] = useState([])

    let [modalActive, setModalActive] = useState(false)

    useEffect(() => {
        props.SetActiveModalWindow(modalActive)
    }, [modalActive])

    useEffect(() => {
        if (rawPriceItems) setPriceItems(formatThreeItemPriceList(rawPriceItems))
    }, [rawPriceItems])

    return (
        <div className='three-item-price-list'>
            {modalActive && <AddThreePriceItemModal requestPriceLists={requestPriceLists}
                                    chosenCategory={chosenCategory}
                                    setModalActive={setModalActive}/>}
            <ThreePriceHeader/>
            <div className="items">
                {priceItems?.map((elem, index) => <ThreeItemPrice key={index} priceItem={elem}/>)}
            </div>
            <button className='add-price-item' onClick={() => setModalActive(true)}>Добавить элемент</button>
        </div>
    )
}

export default connect(
    state => ({}),
    dispatch => ({
        SetActiveModalWindow: (active) => dispatch(SetActiveModalWindow(active)),
    })
)(OneItemPriceList);


export function formatThreeItemPriceList(rawPriceItems) {
    let newPriceItems = []
    let priceItemToBuild;

    for (let item of rawPriceItems) {
        let priceName = `${item.price_group}_price`
        let price = {pk: item.pk, price: item.price}

        if (priceItemToBuild) {
            if (priceItemToBuild.name === item.name) {
                priceItemToBuild[priceName] = price
            }
            if (priceItemToBuild?.shirt_price &&
                priceItemToBuild?.middle_price &&
                priceItemToBuild?.long_price) newPriceItems.push(priceItemToBuild)
        } else {
            priceItemToBuild = {name: item.name}
            priceItemToBuild[priceName] = price
        }
    }
    return newPriceItems
}