import React, {useState} from "react";
import {connect} from "react-redux";
import {deleteVisit} from "../../ajax/data";
import Loader from "../../../../Utils/js/Loader";
import {SetClientErrorDetail} from "../../../../Utils/redux/clientError/clientErrorActions";
import {SetServerErrorDetail} from "../../../../Utils/redux/serverError/serverErrorActions";
import {SetAddClientWindowActive} from "../../../../../redux/actions/Main/addClientWindow_actions";


function ConfirmDeleteVisit({visitId, requestMastersWithVisits, ...props}) {
    let [responseLoaded, setResponseLoaded] = useState(true)
    let [deleteReason, setDeleteReason] = useState('')

    function handleConfirm() {
        setResponseLoaded(false)
        let body = {
            delete_reason: deleteReason
        }
        deleteVisit({
            visitId: visitId,
            body: body,
            success: successDeleteVisit,
            clientError: clientError,
            serverError: serverError
        })
    }

    function successDeleteVisit(data) {
        setResponseLoaded(true)
        props.SetAddClientWindowActive(false)
        requestMastersWithVisits()
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
        <div className='confirm-delete-visit'>
            {!responseLoaded && <Loader size={10}/>}
            <h3>Удаление визита</h3>
            <p>
                Данный визит больше не будет отображаться в журнале,
                но вы всегда сможете посмотреть его в списке визитов клиента
            </p>
            <textarea onChange={(e) => setDeleteReason(e.target.value)}
                      value={deleteReason}
                      placeholder='Причина удаления...'/>
            <button onClick={handleConfirm}>Подтвердить</button>
        </div>
    )
}


export default connect(
    state => ({}),
    dispatch => ({
        SetClientErrorDetail: (detail) => dispatch(SetClientErrorDetail(detail)),
        SetServerErrorDetail: (detail) => dispatch(SetServerErrorDetail(detail)),
        SetAddClientWindowActive: (active) => dispatch(SetAddClientWindowActive(active)),
    })
)(ConfirmDeleteVisit);
