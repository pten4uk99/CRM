import React from "react";
import {connect} from "react-redux";
import {setVisitStatus} from "../ClientWindow/ajax/data";
import {CLIENT_STATUS} from "../../../constants";
import ConfirmedStatusButtons from "./ConfirmedStatusButtons";
import NotCalledStatusButtons from "./NotCalledStatusButtons";
import NeedConfirmStatusButtons from "./NeedConfirmStatusButtons";
import {SetClientInfoActive} from "../../../redux/actions/Main/addClientWindow_actions";


function ClientActions({handleOpenWindow, visitInfo, requestMastersWithVisits, ...props}) {
    let confirmed = visitInfo?.status === CLIENT_STATUS.confirmed
    let notCalled = visitInfo?.status === CLIENT_STATUS.not_called
    let needConfirm = visitInfo?.status === CLIENT_STATUS.need_confirm

    function changeVisitStatus(status) {
        setVisitStatus({
            visitId: visitInfo.pk,
            status: status,
            success: successSetStatus,
            clientError: console.log,
            serverError: console.log
        })
    }

    function successSetStatus(data) {
        requestMastersWithVisits()
    }

    function openWindow(isCashBox) {
        props.SetClientInfoActive(!isCashBox)
        handleOpenWindow()
    }


    return (
        <div className="client-buttons__block">
            <button className="actions change" onClick={() => openWindow(false)}>Изменить</button>
            <button className="actions payment" onClick={() => openWindow(true)}>Оплатить</button>
            <div className="buttons-row">
                {confirmed && <ConfirmedStatusButtons changeVisitStatus={changeVisitStatus}/>}
                {notCalled && <NotCalledStatusButtons changeVisitStatus={changeVisitStatus}/>}
                {needConfirm && <NeedConfirmStatusButtons changeVisitStatus={changeVisitStatus}/>}
            </div>
        </div>
    )
}

export default connect(
    state => ({store: state.Main}),
    dispatch => ({
        SetClientInfoActive: (active) => dispatch(SetClientInfoActive(active)),
    })
)(ClientActions);
