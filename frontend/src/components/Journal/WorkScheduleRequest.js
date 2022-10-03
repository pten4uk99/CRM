import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {DateTime} from "luxon";
import {getMasterTimetable, setMasterTimetable} from "./WorkSchedule/ajax/data";
import WorkSchedulePresentation from "./WorkSchedule/presentation/WorkSchedulePresentation";
import Loader from "../Utils/js/Loader";
import {adaptMasterTimetable} from "./WorkSchedule/ajax/adapters";
import {SetClientErrorDetail} from "../Utils/redux/clientError/clientErrorActions";
import {SetServerErrorDetail} from "../Utils/redux/serverError/serverErrorActions";


function WorkScheduleRequest(props) {
    let defaultDatetime = DateTime.local()
    let [year, setYear] = useState(defaultDatetime.year)
    let [month, setMonth] = useState(defaultDatetime.month)
    let [mastersList, setMastersList] = useState([])
    let [requestLoaded, setRequestLoaded] = useState(true)

    useEffect(() => {
        requestTimeTable()
    }, [month])

    function requestTimeTable() {
        setRequestLoaded(false)
        getMasterTimetable({
            year: year,
            month: month,
            success: successGetTimetable,
            clientError: clientError,
            serverError: serverError
        })
    }

    function setMasterWorkDays({master_id, newWorkDays}) {
        setRequestLoaded(false)
        setMasterTimetable({
            master_id: master_id,
            year: year,
            month: month,
            body: newWorkDays,
            success: successSetTimetable,
            clientError: clientError,
            serverError: serverError
        })
    }

    function successGetTimetable(data) {
        setMastersList(adaptMasterTimetable(data.data))
        setRequestLoaded(true)
    }

    function successSetTimetable(data) {
        requestTimeTable()
    }

    function serverError(message) {
        setRequestLoaded(true)
        props.SetServerErrorDetail(message)
    }

    function clientError(message) {
        setRequestLoaded(true)
        props.SetClientErrorDetail(message)
    }

    if (!requestLoaded) return <Loader size={30} top={200} left={'50%'}/>
    return (
        <WorkSchedulePresentation mastersList={mastersList}
                                  setMasterWorkDays={setMasterWorkDays}
                                  year={year} setYear={setYear}
                                  month={month} setMonth={setMonth}/>
    )
}

export default connect(
    state => ({store: state.Main}),
    dispatch => ({
        SetClientErrorDetail: (detail) => dispatch(SetClientErrorDetail(detail)),
        SetServerErrorDetail: (detail) => dispatch(SetServerErrorDetail(detail)),
    })
)(WorkScheduleRequest);
