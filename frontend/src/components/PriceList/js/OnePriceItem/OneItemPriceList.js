import React, {useEffect, useState} from "react";
import {connect} from "react-redux";

import OneItemPrice from "./OneItemPrice";
import OnePriceHeader from "./OnePriceHeader";
import AddOnePriceItemModal from "./AddOnePriceItemModal";
import {SetActiveModalWindow} from "../../../Utils/redux/modalWindow/modalWindowAction";


function OneItemPriceList({chosenCategory, requestPriceLists, ...props}) {
    let priceItems = chosenCategory?.price_items
    let [modalActive, setModalActive] = useState(false)


    useEffect(() => {
        props.SetActiveModalWindow(modalActive)
    }, [modalActive])

    return (
        <div className='one-item-price-list'>
            {modalActive && <AddOnePriceItemModal chosenCategory={chosenCategory}
                                                  requestPriceLists={requestPriceLists}
                                                  setModalActive={setModalActive}/>}
            <OnePriceHeader/>
            <div className="items">
                {priceItems?.map((elem, index) => <OneItemPrice key={index} priceItem={elem}/>)}
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
