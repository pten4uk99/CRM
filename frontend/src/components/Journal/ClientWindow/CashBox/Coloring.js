import React, {useEffect, useState} from "react";
import {connect} from "react-redux";

import minus from '/src/assets/img/journal/journal-minus.svg'
import addIcon from '/src/assets/img/journal/right-arrow-bordered.svg'
import plus from '/src/assets/img/journal/journal-plus.svg'
import cross from '/src/assets/img/journal/coloring-cross.svg'
import Materials from "./Materials";
import {AddCashPosition} from "../../../../redux/actions/Main/cashResult";


function Coloring(props) {
    let [paintPrice, setPaintPrice] = useState(12)
    let [flourPrice, setFlourPrice] = useState(9)

    let [duration, setDuration] = useState(120)

    let [paintSumValue, setPaintSumValue] = useState('0')
    let [flourSumValue, setFlourSumValue] = useState('0')
    let [paintSumPrice, setPaintSumPrice] = useState('0')
    let [workSumPrice, setWorkSumPrice] = useState('0')

    useEffect(() => {
        setWorkSumPrice(String(250 * duration / 15))
    }, [duration])

    useEffect(() => {
        let paint = Number(paintSumValue) * paintPrice
        let flour = Number(flourSumValue) * flourPrice
        setPaintSumPrice(paint + flour)
    }, [paintPrice, flourPrice])

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

    function handleChangeMaterialsQuantity(e, setValue) {
        let value = Number(e.target.value)

        if (!isNaN(value) && value[value.length - 1] !== 0) setValue(value)
    }

    return (
        <div className="add-client-window__coloring">
            <Materials setPaintSumPrice={setPaintSumPrice}
                       setPaintSumValue={setPaintSumValue}
                       setFlourSumValue={setFlourSumValue}
                       flourPrice={flourPrice}
                       paintPrice={paintPrice}/>

            <div className="prices">

                <div className="price price__client-set">
                    <span>Набор клиента:</span>
                    350р
                </div>

                <div className="price price__sum-materials">
                    <div className="elem">
                        <span>Порошок:</span>
                        <p>{flourSumValue}г</p>
                        <img src={cross} alt="умножить"/>
                        <textarea className='input'
                                  rows="1"
                                  value={flourPrice}
                                  onChange={(e) => handleChangeMaterialsQuantity(e, setFlourPrice)}/>
                    </div>
                    <div className="elem">
                        <span>Краска:</span>
                        <p>{paintSumValue}г</p>
                        <img src={cross} alt="умножить"/>
                        <textarea className='input'
                                  rows="1"
                                  value={paintPrice}
                                  onChange={(e) => handleChangeMaterialsQuantity(e, setPaintPrice)}/>
                    </div>
                </div>

                <div className="price price__sum-paints">
                    <span>Сумма красок:</span>
                    <textarea rows={1}
                              className="input sum-input"
                              value={paintSumPrice}
                              onChange={(e) => setNumberValue(e, setPaintSumPrice)}/>
                </div>

                <div className="price price__sum-work">
                    <div className="elem">
                        <span>Работа:</span>
                        <textarea rows={1}
                                  className="input sum-input"
                                  value={workSumPrice}
                                  onChange={(e) => setNumberValue(e, setWorkSumPrice)}/>
                    </div>

                    <div className="change-time">
                        <img className="minus" src={minus} onClick={() => handleSetDuration(duration - 15)}/>
                        <span className="quantity">
                        {duration >= 60 ? `${Math.trunc(duration / 60)} ч.` : ""} {duration % 60} мин.
                    </span>
                        <img className="plus" src={plus} onClick={() => handleSetDuration(duration + 15)}/>
                    </div>
                </div>

                <button className="main-btn coloring__btn-add" onClick={handleAddInCash}>
                    Добавить в итог
                    <img src={addIcon} alt="добавить"/>
                </button>
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
