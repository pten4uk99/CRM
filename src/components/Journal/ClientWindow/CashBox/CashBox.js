import React, {useEffect, useState} from "react";
import {connect} from "react-redux";

import Service from "./Service";
import minus from "/src/assets/img/cash/cash-minus.svg"
import {RemoveCashPosition} from "../../../../redux/actions/Main/cashResult";


function CashBox(props) {
    let cashResult = props.store.cashResult
    let [calculatorResult, setCalculatorResult] = useState('')
    let [serviceList, setServiceList] = useState([1])
    let [activeService, setActiveService] = useState(1)


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

    function handleAddService() {
        if (serviceList.length < 5) {
            setServiceList([...serviceList, serviceList.length + 1])
            setActiveService(serviceList.length + 1)
        }
    }

    function handleRemoveCashPosition(e, elem) {
        e.stopPropagation()
        props.RemoveCashPosition(elem)
        setServiceList(serviceList.filter((pos) => {
            return pos !== elem.service_index
        }))
        if (activeService === elem.service_index) setActiveService(serviceList.length)
    }

    return (
        <section className="add-client-window__cashbox">

            <div className="service-list__header">
                {serviceList.map((elem) => {
                    return <div className={elem === activeService ? "service-header active" : "service-header"}
                                onClick={() => setActiveService(elem)}>
                        {elem}
                    </div>
                })}
                <div className="plus"
                     onClick={handleAddService}>+</div>
            </div>

            {serviceList.map((elem) => elem === activeService && <Service key={elem} index={elem}/>)}


            <div className="total">
                <div className="service-positions">
                    {cashResult.map((elem, index) => {
                        return <div key={index} className="price-block"
                                    onClick={() => setActiveService(elem.service_index)}>
                            <div className="name">{elem.name}</div>
                            <div className="price">{elem.price}</div>
                            <img className="remove"
                                 src={minus}
                                 alt="Удалить"
                                 onClick={(e) => handleRemoveCashPosition(e, elem)}/>
                        </div>
                    })}
                </div>
                <div className="result">
                    Итог:
                    <textarea className="input result-input"
                              rows={1}
                              value={calculatorResult}
                              onChange={(e) => handleChangeResult(e)}/>
                </div>
            </div>
            <button className="confirm">Оплачено</button>
        </section>
    )
}

export default connect(
    state => ({store: state}),
    dispatch => ({
        RemoveCashPosition: (pos) => dispatch(RemoveCashPosition(pos)),
    })
)(CashBox);