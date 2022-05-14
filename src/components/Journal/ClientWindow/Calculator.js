import React, {useRef, useState} from "react";
import {connect} from "react-redux";

import backArrow from "/src/assets/img/cash/arrow-left.svg"


function CashBox(props) {
    let input = useRef()
    const numbersArr = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0]
    const actionSignArr = ['+', '-', '*', '/']
    const specialSignArr = ['AC', 'BackSpace', 'Enter']

    let [value, setValue] = useState('')

    function handleChangeValue(e) {
        let eValue = e.target.value
        let key = eValue[eValue.length - 1]
        let inActions = actionSignArr.includes(key)

        if (eValue.length < value.length) setValue(eValue)
        else if ((isNaN(Number(key)) && inActions) || eValue.includes(' ')) {
            if (!actionSignArr.includes(eValue[eValue.length - 2])) setValue(eValue)
        }
        else if (!isNaN(Number(key))) setValue(eValue)
        else if (eValue === '') setValue(eValue)
    }

    function handleClickNumber(e) {
        setValue(value + e.target.innerText)
        input.current?.focus()
    }

    function handleClickAction(e) {
        if (!actionSignArr.includes(value[value.length - 1])) setValue(value + e.target.innerText)
        input.current?.focus()
    }

    function handleSpecialAction(newValue) {
        setValue(newValue)
        input.current?.focus()
    }

    function handleCalculate() {
        if (!actionSignArr.includes(value[value.length - 1])) props.setResult(eval(value))
        input.current?.focus()
    }

    return (
        <div className="add-client-window__calculator">
            <input className="money-input"
                   type="text"
                   placeholder="Введите число"
                   value={value}
                   onChange={e => handleChangeValue(e)}
                   ref={input}/>
            
            <div className="calculator">
                <div className="numbers">
                    {numbersArr.map((elem) => <div key={elem}
                                                   className="number"
                                                   onClick={(e) => handleClickNumber(e)}>{elem}</div>)}
                </div>

                {/*<div className="actions">*/}
                {/*    {actionSignArr.map((elem) => <div key={elem}*/}
                {/*                                      className="action"*/}
                {/*                                      onClick={(e) => handleClickAction(e)}>{elem}</div>)}*/}
                {/*</div>*/}

                <div className="special-signs">
                    <div className="remove" onClick={() => handleSpecialAction(value.slice(0, value.length - 1))}>
                        <img src={backArrow} alt="Стереть" style={{width: "50%"}}/>
                    </div>
                    <div className="remove-all" onClick={() => handleSpecialAction('')}>AC</div>
                    <div className="calculate" onClick={handleCalculate}>=</div>
                </div>
            </div>
        </div>
    )
}

export default connect(
    state => ({store: state}),
    dispatch => ({})
)(CashBox);