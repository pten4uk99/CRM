import React, {useEffect, useState} from "react";
import {connect} from "react-redux";

import Service from "./CashBox/Service";
import minus from "/src/assets/img/journal/journal-minus.svg"
import {RemoveCashPosition} from "../../../redux/actions/Main/cashResult";


function CashBox(props) {
    let cashResult = props.store.cashResult
    let [calculatorResult, setCalculatorResult] = useState('')


    useEffect(() => {
        let count = 0
        for (let elem of cashResult) count += Number(elem.price)
        setCalculatorResult(String(count))
    }, [cashResult])

    function handleChangeResult(e) {
        let value = e.target.value
        if (!isNaN(Number(value)) && Number(value) <= 99999 && !value.includes(' ')) {
            setCalculatorResult(e.target.value)
        }
    }

    function handleRemoveCashPosition(e, index) {
        e.stopPropagation()
        props.RemoveCashPosition(index)
    }

    return (
        <section className="add-client-window__cashbox">

            <Service/>

            <div className="total">
                <div className="service-positions">
                    {cashResult.map((elem, index) => {
                        return <div key={index} className="price-block">
                            <div className="name">{elem.name}</div>
                            <div className="price">{elem.price}</div>
                            <img className="remove"
                                 src={minus}
                                 alt="Удалить"
                                 onClick={(e) => handleRemoveCashPosition(e, index)}/>
                        </div>
                    })}
                </div>
                <div className="result">
                    Сумма:
                    <textarea className="input result-input"
                              rows={1}
                              value={calculatorResult}
                              onChange={(e) => handleChangeResult(e)}/>
                </div>
            </div>
            <button className="confirm" onClick={() => localStorage.clear()}>Оплатить</button>
        </section>
    )
}

export default connect(
    state => ({store: state}),
    dispatch => ({
        RemoveCashPosition: (pos) => dispatch(RemoveCashPosition(pos)),
    })
)(CashBox);