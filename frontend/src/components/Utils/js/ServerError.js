import React, {useEffect} from "react";
import {connect} from "react-redux";
import {ClearServerErrorDetail} from "../redux/serverError/serverErrorActions";


function ServerError({lifeTime, ...props}) {
    let detail = props.serverError.detail
    let time = lifeTime * 1000 || 1000 * 7
    let visible = props.serverError.active

    useEffect(() => {
        if (visible) setTimeout(() => props.ClearServerErrorDetail(), time)
    }, [visible])

    if (!visible) return <></>
    return (
        <div className='server-error-tooltip'>
            <h2>Ошибка сервера:</h2>
            <p>{detail}</p>
        </div>
    )
}

export default connect(
    state => ({serverError: state.Main.serverError}),
    dispatch => ({
        ClearServerErrorDetail: () => dispatch(ClearServerErrorDetail())
    })
)(ServerError);
