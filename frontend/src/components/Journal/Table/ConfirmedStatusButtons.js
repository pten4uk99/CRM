import React from "react";
import {connect} from "react-redux";
import {CLIENT_STATUS} from "../../../constants";


function ConfirmedStatusButtons({changeVisitStatus, ...props}) {
    return (
        <>
            <button className="actions need-confirm"
                    onClick={() => changeVisitStatus(CLIENT_STATUS.need_confirm)}>Не подтвержден
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
)(ConfirmedStatusButtons);
