import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import OneItemPriceList from "./OnePriceItem/OneItemPriceList";
import ThreeItemPriceList from "./ThreePriceItem/ThreeItemPriceList";
import {PRICE_LIST_TYPE} from "../../../constants";
import {getPriceLists} from "../ajax/data";
import AddCategoryModal from "./AddCategoryModal";
import {SetActiveModalWindow} from "../../Utils/redux/modalWindow/modalWindowAction";


function PriceList(props) {
    let [priceList, setPriceList] = useState([])
    let [chosenCategory, setChosenCategory] = useState(null)
    let [addCategoryWindowActive, setAddCategoryWindowActive] = useState(false)

    useEffect(() => {requestPriceLists()}, [])

    function requestPriceLists() {
        getPriceLists({
            success: successGetPriceLists,
            clientError: console.log,
            serverError: console.log
        })
    }

    function successGetPriceLists(data) {
        setPriceList(data.data)
    }

    useEffect(() => {
        if (priceList.length > 0) setChosenCategory(priceList[0])
    }, [priceList])

    useEffect(() => {
        props.SetActiveModalWindow(addCategoryWindowActive)
    }, [addCategoryWindowActive])

    return (
        <article className="price-list">
            <div className="block__categories">
                {addCategoryWindowActive && <AddCategoryModal setAddCategoryWindowActive={setAddCategoryWindowActive}
                                                              requestPriceLists={requestPriceLists}/>}
                {priceList.map((elem) => <h1 key={elem.pk}
                                              className={`category ${chosenCategory === elem && "active"}`}
                                              onClick={() => setChosenCategory(elem)}>{elem.name}</h1>)}
                <button className="add-category"
                        onClick={() => setAddCategoryWindowActive(true)}>Добавить категорию</button>
            </div>

            <div className="table">
                {chosenCategory?.type === PRICE_LIST_TYPE.one_price_item &&
                    <OneItemPriceList requestPriceLists={requestPriceLists}
                                      chosenCategory={chosenCategory}/>}
                {chosenCategory?.type === PRICE_LIST_TYPE.three_price_item &&
                    <ThreeItemPriceList requestPriceLists={requestPriceLists}
                                        chosenCategory={chosenCategory}/>}
            </div>

        </article>
    )
}

export default connect(
    state => ({store: state}),
    dispatch => ({
        SetActiveModalWindow: (active) => dispatch(SetActiveModalWindow(active)),
    })
)(PriceList);
