import React, {useEffect} from "react";
import {connect} from "react-redux";

import minus from "/src/assets/img/journal/journal-minus.svg"
import {AddCashPosition, RemoveCashPosition} from "../../../../redux/actions/Main/cashResult";


function Total({calculatorResult, setCalculatorResult, ...props}) {
    let cashResult = props.store_cash_result

    useEffect(() => {
        let count = 0
        for (let elem of cashResult) count += Number(elem.price)
        setCalculatorResult(count)
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
        <div className="total">
            <div className="service-positions">
                {cashResult?.map((elem, index) => <div key={index} className="price-block">
                    <div className="name">{elem.name}</div>
                    <div className="price">{elem.price}</div>
                    <img className="remove"
                         src={minus}
                         alt="Удалить"
                         onClick={(e) => handleRemoveCashPosition(e, index)}/>
                </div>)}
            </div>
            <div className="result">
                Сумма:
                <textarea className="input result-input"
                          rows={1}
                          value={calculatorResult}
                          onChange={(e) => handleChangeResult(e)}/>
            </div>
        </div>
    )
}

export default connect(
    state => ({store_cash_result: state.cashResult}),
    dispatch => ({
        AddCashPosition: (pos) => dispatch(AddCashPosition(pos)),
        RemoveCashPosition: (pos) => dispatch(RemoveCashPosition(pos)),
    })
)(Total);
