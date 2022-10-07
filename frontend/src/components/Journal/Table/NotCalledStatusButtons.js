import React from "react";
import {connect} from "react-redux";
import {CLIENT_STATUS} from "../../../constants";


function NotCalledStatusButtons({changeVisitStatus, ...props}) {
    return (
        <>
            <button className="actions confirmed"
                    onClick={() => changeVisitStatus(CLIENT_STATUS.confirmed)}>Подтвердить запись
            </button>
            <button className="actions need-confirm"
                    onClick={() => changeVisitStatus(CLIENT_STATUS.need_confirm)}>Не подтвержден
            </button>
        </>
    )
}

export default connect(
    state => ({}),
    dispatch => ({})
)(NotCalledStatusButtons);
