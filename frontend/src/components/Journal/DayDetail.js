import React, {useEffect, useState} from "react";
import {connect} from "react-redux";

import Time from "./Time";
import Masters from "./Masters/Masters";
import AddClientWindow from "./ClientWindow/AddClientWindow";
import Loader from "../Utils/js/Loader";
import {getMastersWithVisits} from "./Masters/ajax/data";
import {SetAddClientWindowMastersList} from "../../redux/actions/Main/masters_actions";
import {SetClientErrorDetail} from "../Utils/redux/clientError/clientErrorActions";
import {SetServerErrorDetail} from "../Utils/redux/serverError/serverErrorActions";


function DayDetail(props) {
    let addClientWindow = props.store_add_client_window
    let checkedDate = props.store_calendar.checkedDate
    let [responseLoaded, setResponseLoaded] = useState(true)
    let [errorDataLoading, setErrorDataLoading] = useState(false)
    let [workDayMastersList, setWorkDayMastersList] = useState([])

    useEffect(() => {requestMastersWithVisits()}, [checkedDate])

    function requestMastersWithVisits() {
        setResponseLoaded(false)
        getMastersWithVisits({
            year: checkedDate.getFullYear(),
            month: checkedDate.getMonth() + 1,
            day: checkedDate.getDate(),
            success: successGetMastersList,
            clientError: clientError,
            serverError: serverError
        })
    }

    function successGetMastersList(data) {
        setWorkDayMastersList(data.data)

        let masters = []
        for (let masterVisit of data.data) {
            masters.push(masterVisit.master)
        }

        props.SetAddClientWindowMastersList(masters)
        setResponseLoaded(true)
    }

    function clientError(detail) {
        setResponseLoaded(true)
        props.SetClientErrorDetail(detail)
    }

    function serverError(detail) {
        setResponseLoaded(true)
        setErrorDataLoading(true)
        props.SetServerErrorDetail(detail)
    }

    return (
        !errorDataLoading ?
            <section className="day-detail__block">
                {addClientWindow.active ?
                    <AddClientWindow requestMastersWithVisits={requestMastersWithVisits}/> :
                    <></>}

                {!responseLoaded ?
                    <Loader size={50} top={300} left='50%' position='absolute'/> :
                    <>
                        <Time/>
                        <Masters responseLoaded={responseLoaded}
                                 setResponseLoaded={setResponseLoaded}
                                 workDayMastersList={workDayMastersList}
                                 requestMastersWithVisits={requestMastersWithVisits}/>
                    </>}

            </section> :
            <div style={{
                position: 'relative',
                top: '50%',
                textAlign: 'center',
                fontSize: 20,
                fontWeight: 500,
                color: 'rgb(255,0,0)'
            }}>Ошибка загрузки данных</div>
    )
}

export default connect(
    state => ({store_add_client_window: state.Main.addClientWindow, store_calendar: state.calendar}),
    dispatch => ({
        SetAddClientWindowMastersList: (mastersList) => dispatch(SetAddClientWindowMastersList(mastersList)),
        SetClientErrorDetail: (detail) => dispatch(SetClientErrorDetail(detail)),
        SetServerErrorDetail: (detail) => dispatch(SetServerErrorDetail(detail)),
    })
)(DayDetail);
