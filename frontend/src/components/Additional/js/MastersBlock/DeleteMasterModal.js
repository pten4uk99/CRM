import React, {useState} from "react";
import {connect} from "react-redux";

import ModalWindow from "../../../Utils/js/ModalWindow";
import {SetActiveModalWindow} from "../../../Utils/redux/modalWindow/modalWindowAction";


function DeleteMasterModal({master,  onDeleteConfirm, onClose, ...props}) {
    let [responseLoaded, setResponseLoaded] = useState(true)

    function handleConfirm() {
        setResponseLoaded(false)
        onDeleteConfirm()
    }

    return (
        <div className='delete-master-modal'>
            <ModalWindow onConfirm={handleConfirm} loading={!responseLoaded} onCancel={onClose}>
                <h3 className='delete-master-modal__header'>Удаление мастера</h3>
                <div className="delete-master-modal__data">
                    <p>Вы действительно хотите удалить данного мастера?</p>
                    <p style={{
                        marginTop: 20,
                        marginBottom: 10,
                        fontSize: 20,
                        fontWeight: 600,
                    }}>{master?.name} {master?.lastName}</p>
                    <p style={{
                        color: "red",
                        fontSize: 13,
                    }}>Отменить это действие будет невозможно!</p>
                </div>
            </ModalWindow>
        </div>
    )
}

export default connect(
    state => ({store: state}),
    dispatch => ({
        SetActiveModalWindow: (active) => dispatch(SetActiveModalWindow(active)),
    })
)(DeleteMasterModal);
