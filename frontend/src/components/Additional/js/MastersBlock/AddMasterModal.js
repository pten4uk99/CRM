import React, {useState} from "react";
import {connect} from "react-redux";

import ModalWindow from "../../../Utils/js/ModalWindow";
import {handleInputChange} from "../../../Journal/ClientWindow/ClientInfo";
import {createNewMaster} from "../../ajax/data";
import {SetActiveModalWindow} from "../../../Utils/redux/modalWindow/modalWindowAction";


function AddMasterModal({...props}) {

    let [name, setName] = useState('')
    let [lastName, setLastName] = useState('')

    function handleConfirm() {
        createNewMaster({name: name, last_name: lastName})
        props.SetActiveModalWindow(false)
    }

    return (
        <div className='add-master-modal'>
            <ModalWindow onConfirm={handleConfirm}>
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
        SetActiveModalWindow: (active) => dispatch(SetActiveModalWindow(active))
    })
)(AddMasterModal);
