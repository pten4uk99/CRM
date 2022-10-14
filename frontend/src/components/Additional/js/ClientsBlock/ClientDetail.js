import React, {useEffect, useState} from "react";
import {connect} from "react-redux";

import leftArrow from "/src/assets/img/cash/arrow-left.svg"
import Visit from "./Visit";
import {clientDetail} from "../../ajax/data";
import {SetClientErrorDetail} from "../../../Utils/redux/clientError/clientErrorActions";
import {SetServerErrorDetail} from "../../../Utils/redux/serverError/serverErrorActions";
import {phoneToPresentation} from "../../../Journal/Table/Client";


function ClientDetail({clientId, setChosenClient, ...props}) {
    let [clientInfo, setClientInfo] = useState(null)
    let [responseLoaded, setResponseLoaded] = useState(true)

    useEffect(() => {
        clientDetail({
            clientId: clientId,
            success: successGetClientDetail,
            clientError: clientError,
            serverError: serverError
        })
    }, [])

    function successGetClientDetail(data) {
        setClientInfo(data.data[0])
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
        <div className="client-detail">
            <img className="back-arrow"
                 src={leftArrow} alt="Назад"
                 onClick={() => setChosenClient(null)}/>

            <div className="content">
                <p className="name">Имя: <span>{clientInfo?.name}</span></p>
                <p className="last-name">Фамилия: <span>{clientInfo?.last_name}</span></p>
                <p className="phone">Телефон: <span>{phoneToPresentation(clientInfo?.phone)}</span></p>

                <p className="visits-header">Посещения</p>

                <div className="visits">
                    {clientInfo?.visits?.map((visit) => <Visit key={visit.pk} visitInfo={visit}/>)}
                </div>
            </div>
        </div>
    )
}

export default connect(
    state => ({store: state}),
    dispatch => ({
        SetClientErrorDetail: (detail) => dispatch(SetClientErrorDetail(detail)),
        SetServerErrorDetail: (detail) => dispatch(SetServerErrorDetail(detail)),
    })
)(ClientDetail);
