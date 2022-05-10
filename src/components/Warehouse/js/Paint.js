import React, {useState} from "react";

import favorites from "../../../assets/img/warehouse/favorites.svg";
import favoritesAdded from "../../../assets/img/warehouse/favorites-added.svg";
import plus from "../../../assets/img/warehouse/plus.svg";
import minus from "../../../assets/img/warehouse/minus.svg";
import trash from "../../../assets/img/warehouse/trash.svg";
import hide from "../../../assets/img/warehouse/hide.svg";
import {connect} from "react-redux";
import SetPaintInfo from "./SetPaintInfo";
import {SetInFavorites, SetPaintQuantity} from "../redux/actions/paints";


function Paint(props) {
    let data = props.data
    let category = data.category[0]
    let quantityArr = getQuantityArr()

    let [changeInfoActive, setChangeInfoActive] = useState(false);
    let [type, setType] = useState('');

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

    function submitHandler(e) {
        let form = e.target
        let packages = Number(form['packages']?.value) || 0
        let formQuantity = Number(form['quantity']?.value) || 0
        let quantity = packages * data.volume + formQuantity

        if (type === 'add') props.SetPaintQuantity(data.id, data.quantity + quantity)
        else if (type === 'expense') {
            let checkedQuantity = data.quantity - quantity
            if (checkedQuantity < 0) checkedQuantity = 0
            props.SetPaintQuantity(data.id, checkedQuantity)
        }
    }

    return (
        <>
            <li className="paint">
                <div className="main">
                    <span className="category" style={category === 'S' ? {color: 'red'} : {}}>{category}</span>
                    <span className="name">{data.name}</span>
                    <div className="right-block">
                        <div className="favorites">
                            <img src={data.inFavorites ? favoritesAdded : favorites}
                                 alt="избранное"
                                 onClick={() => props.SetInFavorites(data.id, !data.inFavorites)}/>
                        </div>
                        <div className="quantity">
                            <div className="change-quantity">
                                <img className="plus"
                                     src={plus}
                                     alt="прибавить"
                                     onClick={() => {setChangeInfoActive(!changeInfoActive); setType('add')}}/>
                                <img className="minus"
                                     src={minus} alt="отнять"
                                     onClick={() => {{setChangeInfoActive(!changeInfoActive); setType('expense')}}}/>
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
            <SetPaintInfo type={type}
                          active={changeInfoActive}
                          setActive={setChangeInfoActive}
                          onSubmit={(e) => submitHandler(e)}/>
        </>
    )
}

export default connect(
    state => ({store: state}),
    dispatch => ({
        SetPaintQuantity: (id, quantity) => dispatch(SetPaintQuantity(id, quantity)),
        SetInFavorites: (id, inFavorites) => dispatch(SetInFavorites(id, inFavorites)),
    })
)(Paint);
