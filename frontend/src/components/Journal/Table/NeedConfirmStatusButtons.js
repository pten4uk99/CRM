import React from "react";
import {connect} from "react-redux";
import {CLIENT_STATUS} from "../../../constants";


function NeedConfirmStatusButtons({changeVisitStatus, ...props}) {
    return (
        <>
            <button className="actions confirmed"
                    onClick={() => changeVisitStatus(CLIENT_STATUS.confirmed)}>Подтвердить запись
            </button>
            <button className="actions not-called"
                    onClick={() => changeVisitStatus(CLIENT_STATUS.not_called)}>Не дозвонились
            </button>
        </>
    )
}

export default connect(
    state => ({}),
    dispatch => ({})
)(NeedConfirmStatusButtons);
