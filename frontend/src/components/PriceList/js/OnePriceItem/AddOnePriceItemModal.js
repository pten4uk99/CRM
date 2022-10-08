import React, {useState} from "react";
import {connect} from "react-redux";

import {SetActiveModalWindow} from "../../../Utils/redux/modalWindow/modalWindowAction";
import {SetClientErrorDetail} from "../../../Utils/redux/clientError/clientErrorActions";
import {SetServerErrorDetail} from "../../../Utils/redux/serverError/serverErrorActions";
import ModalWindow from "../../../Utils/js/ModalWindow";
import {addOnePriceItem} from "../../ajax/data";


function AddOnePriceItemModal({chosenCategory, requestPriceLists, setModalActive, ...props}) {
    let [responseLoaded, setResponseLoaded] = useState(true)
    let [name, setName] = useState('')
    let [price, setPrice] = useState('')
    let [description, setDescription] = useState('')

    function handleConfirm() {
        setResponseLoaded(false)

        let body = {
            price_list_id: chosenCategory.pk,
            name: name,
            price: price,
            description: description
        }

        addOnePriceItem({
            body: body,
            success: successAddPriceItem,
            clientError: clientError,
            serverError: serverError
        })
    }

    function successAddPriceItem(data) {
        setResponseLoaded(true)
        props.SetActiveModalWindow(false)
        setModalActive(false)
        requestPriceLists()
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
        <ModalWindow onConfirm={handleConfirm} onCancel={() => setModalActive(false)} loading={!responseLoaded}>
            <h3>Добавление позиции прайс листа</h3>
            <p style={{
                display: "flex",
                flexDirection: "column",
                marginTop: 10,
            }}>
                <input type="text"
                       style={{
                           marginTop: 10,
                           marginBottom: 10,
                           padding: "7px 5px",
                       }}
                       placeholder='Название'
                       value={name}
                       onChange={(e) => setName(e.target.value)}/>
                <textarea placeholder='Описание'
                          style={{
                              outline: "none",
                              border: 'none',
                              marginBottom: 10,
                              padding: "7px 5px",
                              resize: "none"
                          }}
                          onChange={(e) => setDescription(e.target.value)}/>
                <input type="number"
                       placeholder='Цена'
                       value={price}
                       style={{
                           padding: "7px 5px"
                       }}
                       onChange={(e) => setPrice(e.target.value)}/>
            </p>
        </ModalWindow>
    )
}

export default connect(
    state => ({}),
    dispatch => ({
        SetActiveModalWindow: (active) => dispatch(SetActiveModalWindow(active)),
        SetClientErrorDetail: (detail) => dispatch(SetClientErrorDetail(detail)),
        SetServerErrorDetail: (detail) => dispatch(SetServerErrorDetail(detail)),
    })
)(AddOnePriceItemModal);
