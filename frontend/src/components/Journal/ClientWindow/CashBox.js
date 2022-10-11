import React, {useState} from "react";
import {connect} from "react-redux";

import Service from "./CashBox/Service";
import Total from "./CashBox/Total";
import PaymentDropDown from "./CashBox/PaymentDropDown";


function CashBox({requestMastersWithVisits, ...props}) {
    let [calculatorResult, setCalculatorResult] = useState(0)
    let [paymentActive, setPaymentActive] = useState(false)

    function activatePayment(e) {
        e.stopPropagation()
        setPaymentActive(true)
    }

    return (
        <section className="add-client-window__cashbox" onClick={() => setPaymentActive(false)}>
            <Service/>
            <Total calculatorResult={calculatorResult}
                   setCalculatorResult={setCalculatorResult}/>
            {paymentActive && <PaymentDropDown calculatorResult={calculatorResult}
                                               requestMastersWithVisits={requestMastersWithVisits}/>}
            <button className="confirm" onClick={(e) => activatePayment(e)}>
                Оплатить
            </button>
        </section>
    )
}

export default connect(
    state => ({}),
    dispatch => ({})
)(CashBox);