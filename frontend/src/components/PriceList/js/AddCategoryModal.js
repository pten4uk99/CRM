import React, {useState} from "react";
import {connect} from "react-redux";
import ModalWindow from "../../Utils/js/ModalWindow";
import {addPriceListCategory} from "../ajax/data";
import {PRICE_LIST_TYPE} from "../../../constants";
import {SetActiveModalWindow} from "../../Utils/redux/modalWindow/modalWindowAction";
import {SetClientErrorDetail} from "../../Utils/redux/clientError/clientErrorActions";
import {SetServerErrorDetail} from "../../Utils/redux/serverError/serverErrorActions";


function AddCategoryModal({requestPriceLists, setAddCategoryWindowActive, ...props}) {
    let [responseLoaded, setResponseLoaded] = useState(true)
    let [chosenCategory, setChosenCategory] = useState(PRICE_LIST_TYPE.one_price_item)
    let [categoryName, setCategoryName] = useState('')

    function handleConfirm() {
        setResponseLoaded(false)

        let body = {
            name: categoryName,
            type: chosenCategory
        }
        addPriceListCategory({
            body: body,
            success: successAddCategory,
            clientError: clientError,
            serverError: serverError,
        })
    }

    function successAddCategory(data) {
        setResponseLoaded(true)
        props.SetActiveModalWindow(false)
        setAddCategoryWindowActive(false)
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
        <ModalWindow onConfirm={handleConfirm}
                     onCancel={() => setAddCategoryWindowActive(false)}
                     loading={!responseLoaded}>
            <h3>Добавление категории</h3>
            <p style={{display: "flex", flexDirection: "column",}}>
                <label style={{fontSize: 14, marginTop: 20}}>
                    Категория:
                    <select onChange={(e) => setChosenCategory(e.target.value)}
                            style={{
                                border: "none",
                                outline: "none",
                                padding: "5px 7px",
                                marginLeft: 10,
                                cursor: "pointer",
                            }}
                            defaultValue={chosenCategory}>
                        <option value={PRICE_LIST_TYPE.one_price_item}>Одна цена</option>
                        <option value={PRICE_LIST_TYPE.three_price_item}>Три цены</option>
                    </select>
                </label>

                <input type="text"
                       style={{
                           marginTop: 10,
                           padding: "7px 5px",
                       }}
                       placeholder='Название категории...'
                       onChange={(e) => setCategoryName(e.target.value)}/>
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
)(AddCategoryModal);
