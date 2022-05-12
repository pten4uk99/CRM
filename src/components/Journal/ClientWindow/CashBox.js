import React, {useState} from "react";
import {connect} from "react-redux";
import Calculator from "./Calculator";
import {handleInputChange} from "./ClientInfo";


function CashBox(props) {
    let [calculatorResult, setCalculatorResult] = useState('')

    return (
        <section className="add-client-window__cashbox">
            <Calculator setResult={setCalculatorResult}/>
            <p className="service">
                <textarea className="input input-service"
                          onChange={(e) => handleInputChange(e)}
                          name="service"
                          placeholder="Услуга"/>
            </p>
            <div className="service-tooltip">
                <div className="price-block" onClick={() => setCalculatorResult('600')}>
                    <div className="name">Стрижка модельная</div>
                    <div className="price">600</div>
                </div>
                <div className="price-block" onClick={() => setCalculatorResult('1500')}>
                    <div className="name">Стрижка не модельная</div>
                    <div className="price">1500</div>
                </div>
            </div>

            <div className="result">Итог: {calculatorResult}</div>
            <button className="confirm">Услуга оплачена</button>
        </section>
    )
}

export default connect(
    state => ({store: state}),
    dispatch => ({})
)(CashBox);