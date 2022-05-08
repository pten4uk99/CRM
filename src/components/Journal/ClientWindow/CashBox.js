import React, {useState} from "react";
import {connect} from "react-redux";
import Calculator from "./Calculator";


function CashBox(props) {
    let [calculatorResult, setCalculatorResult] = useState('')

    return (
        <section className="add-client-window__cashbox">
            <Calculator setResult={setCalculatorResult}/>
            <div className="right-block">
                <p className="service">
                    <input className="input-service"
                           name="service"
                           placeholder="Услуга"/>
                </p>
                <div className="result">Итог: {calculatorResult}</div>
                <button className="confirm">Услуга оплачена</button>
            </div>
        </section>
    )
}

export default connect(
    state => ({store: state}),
    dispatch => ({})
)(CashBox);