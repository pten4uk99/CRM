import React, {useEffect, useState} from "react";
import {connect} from "react-redux";

import Materials from "./Materials";
import {AddCashPosition} from "../../../../redux/actions/Main/cashResult";


function Coloring(props) {
    const paintPrice = 12
    const flourPrice = 9

    let [duration, setDuration] = useState(120)

    let [paintSumValue, setPaintSumValue] = useState('0')
    let [flourSumValue, setFlourSumValue] = useState('0')
    let [paintSumPrice, setPaintSumPrice] = useState('0')
    let [workSumPrice, setWorkSumPrice] = useState('0')

    useEffect(() => {
        setWorkSumPrice(String(250 * duration / 15))
    }, [duration])

    function setNumberValue(e, setValue) {
        if (!isNaN(Number(e.target.value))) setValue(e.target.value)
    }

    function handleAddInCash() {
        let visit = JSON.parse(localStorage.getItem(`visit ${1}`))
        if (visit) {
            if (props.store.cashResult.filter(elem => elem.name === 'Окрашивание').length < 1) {
                props.AddCashPosition({
                    name: 'Окрашивание',
                    price: Number(paintSumPrice) + Number(workSumPrice)
                })
            }
        }
    }

    function handleSetDuration(newDuration) {
        if (newDuration >= 15 && newDuration <= 720) setDuration(newDuration)
    }

    return (
        <div className="add-client-window__coloring">
            <Materials setPaintSumPrice={setPaintSumPrice}
                       setPaintSumValue={setPaintSumValue}
                       setFlourSumValue={setFlourSumValue}
                       flourPrice={flourPrice}
                       paintPrice={paintPrice}/>

            <div className="prices">
                <div className="price">
                    <span>Набор клиента:</span>
                    350р
                </div>
                <div className="price">
                    <span>Порошок:</span>
                    {flourSumValue}г
                </div>
                <div className="price">
                    <span>Краска:</span>
                    {paintSumValue}г
                </div>

                <div className="price mt-30">
                    <span>Работа:</span>
                    <textarea rows={1}
                              className="input work-input"
                              value={workSumPrice}
                              onChange={(e) => setNumberValue(e, setWorkSumPrice)}/>
                </div>

                <div className="change-time">
                    <span className="minus" onClick={() => handleSetDuration(duration - 15)}>-</span>
                    <span className="quantity">
                        {duration >= 60 ? `${Math.trunc(duration / 60)} ч.` : ""} {duration % 60} мин.
                    </span>
                    <span className="plus" onClick={() => handleSetDuration(duration + 15)}>+</span>
                </div>

                <div className="price">
                    <span>Сумма красок:</span>
                    <textarea rows={1}
                              className="input total-input"
                              value={paintSumPrice}
                              onChange={(e) => setNumberValue(e, setPaintSumPrice)}/>
                </div>
                <button className="main-btn" onClick={handleAddInCash}>Добавить в итог -></button>
            </div>
        </div>
    )
}

export default connect(
    state => ({store: state}),
    dispatch => ({
        AddCashPosition: (pos) => dispatch(AddCashPosition(pos)),
    })
)(Coloring);


export function roundFifty(number) {
    let leftBorder = number
    let rightBorder = number

    while (true) {
        if (rightBorder % 50 === 0) break
        if (leftBorder % 50 === 0 || leftBorder === 0) break
        if (number - leftBorder > 50 || rightBorder - number > 50) break
        leftBorder--
        rightBorder++
    }

    if (rightBorder % 50 === 0) return rightBorder
    if (leftBorder % 50 === 0 || leftBorder === 0) return leftBorder
}
