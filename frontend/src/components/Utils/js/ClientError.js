import React, {useEffect} from "react";
import {connect} from "react-redux";

import {ClearClientErrorDetail} from "../redux/clientError/clientErrorActions";


function ClientError({lifeTime, ...props}) {
    let detail = props.clientError.detail
    let time = lifeTime * 1000 || 1000 * 7
    let visible = props.clientError.active

    useEffect(() => {
        if (visible) setTimeout(() => props.ClearClientErrorDetail(), time)
    }, [visible])

    if (!visible) return <></>
    return (
        <div className='client-error-tooltip'>
            <h2>Ошибка</h2>
            <p>{detail}</p>
        </div>
    )
}

export default connect(
    state => ({clientError: state.Main.clientError}),
    dispatch => ({
        ClearClientErrorDetail: () => dispatch(ClearClientErrorDetail())
    })
)(ClientError);
