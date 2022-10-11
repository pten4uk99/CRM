import React, {useState} from "react";
import {connect} from "react-redux";
import {visitPayment} from "../ajax/data";
import Loader from "../../../Utils/js/Loader";
import {SetAddClientWindowActive} from "../../../../redux/actions/Main/addClientWindow_actions";
import {SetServerErrorDetail} from "../../../Utils/redux/serverError/serverErrorActions";
import {SetClientErrorDetail} from "../../../Utils/redux/clientError/clientErrorActions";


function PaymentDropDown({calculatorResult, requestMastersWithVisits, ...props}) {
    let cashResult = props.store_cash_result
    let addClientWindow = props.store_add_client_window
    let [responseLoaded, setResponseLoaded] = useState(true)

    let [discount, setDiscount] = useState(0)
    let [card, setCard] = useState(0)

    function handlePayment() {
        setResponseLoaded(false)
        let services = []
        for (let elem of cashResult) {
            let inServices = false
            for (let service of services) {
                if (service.pk === elem.pk) {
                    service.quantity += 1
                    inServices = true
                }
            }
            if (!inServices) {
                services.push({pk: elem.pk, quantity: 1})
            }
            inServices = false
        }

        let body = {
            paid: calculatorResult,
            discount: discount,
            card: card,
            services: services
        }
        visitPayment({
            visitId: addClientWindow.chosenVisitId,
            body: body,
            success: successVisitPayment,
            clientError: clientError,
            serverError: serverError
        })

    }

    function successVisitPayment(data) {
        setResponseLoaded(true)
        props.SetAddClientWindowActive(false)
        requestMastersWithVisits()
        localStorage.clear()
    }

    function clientError(detail) {
        setResponseLoaded(true)
        props.SetClientErrorDetail(detail)
    }

    function serverError(detail) {
        setResponseLoaded(true)
        props.SetServerErrorDetail(detail)
    }

    return (
        <div className="add-client-window__payment-dropdown" onClick={(e) => e.stopPropagation()}>
            {!responseLoaded && <Loader size={10} left={10} top={15}/>}
            <h3>Оплата записи</h3>
            <label>
                Переведено на карту:
                <span><input type="number"
                             step={100}
                             min={0}
                             value={card}
                             onChange={(e) => setCard(e.target.value)}/> руб.</span>
            </label>
            <label>
                Скидка:
                <span><input type="number"
                             step={100}
                             min={0}
                             value={discount}
                             onChange={(e) => setDiscount(e.target.value)}/> руб.</span>
            </label>

            <div className="payment">Итог: <span>{calculatorResult}</span> руб.</div>
            <button onClick={handlePayment}>Оплатить</button>
        </div>
    )
}

export default connect(
    state => ({store_cash_result: state.cashResult, store_add_client_window: state.Main.addClientWindow}),
    dispatch => ({
        SetClientErrorDetail: (detail) => dispatch(SetClientErrorDetail(detail)),
        SetServerErrorDetail: (detail) => dispatch(SetServerErrorDetail(detail)),
        SetAddClientWindowActive: (active) => dispatch(SetAddClientWindowActive(active)),
    })
)(PaymentDropDown);
