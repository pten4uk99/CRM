import React, {useState} from "react";
import {connect} from "react-redux";


function PriceList(props) {
    let priceList = props.store.priceList
    let [chosenCategory, setChosenCategory] = useState(priceList[0]?.category)

    return (
        <article className="price-list">
            <div className="block__categories">
                {priceList.map((elem, index) => {
                    return <h1 key={index}
                               className={`category ${chosenCategory === elem.category && "active"}`}
                               onClick={() => setChosenCategory(elem.category)}>{elem.category}</h1>
                })}
            </div>

            <div className="table">
                {priceList.map((elem) => {
                    if (elem.category === chosenCategory) {
                        return elem.positions.map((e, index) => {
                            return <div key={index} className="table-row">
                                <div className="header">
                                    <div className="name">{e.name}</div>
                                    <div className="description">{e.description}</div>
                                </div>
                                <div className="price">{e.price}</div>
                            </div>
                        })
                    }
                })}
            </div>
        </article>
    )
}

export default connect(
    state => ({store: state}),
    dispatch => ({})
)(PriceList);
