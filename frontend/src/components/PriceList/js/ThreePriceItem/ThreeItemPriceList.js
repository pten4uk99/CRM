import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import ThreeItemPrice from "./ThreeItemPrice";
import ThreePriceHeader from "./ThreePriceHeader";
import AddThreePriceItemModal from "./AddThreePriceItemModal";
import {SetActiveModalWindow} from "../../../Utils/redux/modalWindow/modalWindowAction";


function OneItemPriceList({chosenCategory, requestPriceLists, ...props}) {
    let priceItems = chosenCategory?.price_items

    let [modalActive, setModalActive] = useState(false)

    useEffect(() => {
        props.SetActiveModalWindow(modalActive)
    }, [modalActive])

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
