import React from "react";

import fav from "../../../assets/img/warehouse/favorites.svg";
import plus from "../../../assets/img/warehouse/plus.svg";
import minus from "../../../assets/img/warehouse/minus.svg";
import trash from "../../../assets/img/warehouse/trash.svg";
import hide from "../../../assets/img/warehouse/hide.svg";
import {connect} from "react-redux";
import SetPaintInfo from "./SetPaintInfo";


function Paint(props) {
    let data = props.data
    let category = data.category[0]
    let quantityArr = getQuantityArr()

    function getQuantityArr() {
        let countPaints = Math.trunc(data.quantity / data.volume)
        let arr = []
        for (let i = 1; i <= countPaints; i++) arr.push(i)
        return arr
    }

    function getStyleSegment() {
        let color;
        if (quantityArr.length === 1) color = "orange"
        else color = "green"
        return {backgroundColor: color}
    }

    return (
        <>
            <li className="paint">
                <div className="main">
                    <span className="category" style={category === 'S' ? {color: 'red'} : {}}>{category}</span>
                    <span className="name">{data.name}</span>
                    <div className="right-block">
                        <div className="favorites">
                            <img src={fav} alt="избранное"/>
                        </div>
                        <div className="quantity">
                            <div className="change-quantity">
                                <img className="plus" src={plus} alt="прибавить"/>
                                <img className="minus" src={minus} alt="отнять"/>
                            </div>
                            <div className="view-quantity">
                                <div className="block-segments" title="Количество упаковок краски">
                                    {quantityArr.map((number) => {
                                        return <div key={number} className="block-segment" style={getStyleSegment()}/>
                                    })}

                                </div>
                                <p title="Остаток краски в граммах"
                                   style={quantityArr.length < 1 ? {color: "red"} : {}}>
                                    {data.quantity % data.volume}г
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="actions">
                    <div className="trash"><img src={trash} alt="удалить"/></div>
                    <div className="hide"><img src={hide} alt="скрыть"/></div>
                </div>
            </li>
            <SetPaintInfo/>
        </>
    )
}

export default connect(
    state => ({store: state}),
    dispatch => ({})
)(Paint);
