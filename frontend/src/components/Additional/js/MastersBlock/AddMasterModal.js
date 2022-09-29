import React, {useState} from "react";
import {connect} from "react-redux";

import ModalWindow from "../../../Utils/js/ModalWindow";
import {handleInputChange} from "../../../Journal/ClientWindow/ClientInfo";
import {createNewMaster} from "../../ajax/data";
import {SetActiveModalWindow} from "../../../Utils/redux/modalWindow/modalWindowAction";
import {SetClientErrorDetail} from "../../../Utils/redux/clientError/clientErrorActions";


function AddMasterModal({...props}) {

    let [name, setName] = useState('')
    let [lastName, setLastName] = useState('')
    let [responseLoaded, setResponseLoaded] = useState(true)

    function handleConfirm() {
        let master = {name: name, last_name: lastName}

        setResponseLoaded(false)
        createNewMaster({masterObj: master, error: errorResponse})
    }

    function successResponse() {
        setResponseLoaded(true)
        props.SetActiveModalWindow(false)
    }

    function errorResponse(detail) {
        setResponseLoaded(true)
        props.SetClientErrorDetail(detail)
    }

    return (
        <div className='add-master-modal'>
            <ModalWindow onConfirm={handleConfirm} loading={!responseLoaded}>
                <h3 className="add-master-modal__header">Создание нового мастера</h3>
                <div className="add-master-modal__data">
                    <input className='input add-master-modal__input'
                           name='name'
                           onChange={(e) => {handleInputChange(e); setName(e.target.value)}}
                           value={name}
                           type="text"
                           placeholder='Имя'/>
                    <input className='input add-master-modal__input'
                           name='last_name'
                           onChange={(e) => {handleInputChange(e); setLastName(e.target.value)}}
                           value={lastName}
                           type="text"
                           placeholder='Фамилия'/>
                </div>
            </ModalWindow>
        </div>
    )
}

export default connect(
    state => ({store: state}),
    dispatch => ({
        SetActiveModalWindow: (active) => dispatch(SetActiveModalWindow(active)),
        SetClientErrorDetail: (detail) => dispatch(SetClientErrorDetail(detail)),
    })
)(AddMasterModal);
