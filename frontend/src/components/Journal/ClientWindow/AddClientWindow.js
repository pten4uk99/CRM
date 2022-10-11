import React, {useEffect, useState} from "react";
import {connect} from "react-redux";

import leftArrow from '/src/assets/img/left-arrow.svg'
import rightArrow from '/src/assets/img/right-arrow.svg'
import close from '/src/assets/img/journal/journal-close.svg'
import {SetAddClientWindowActive} from "../../../redux/actions/Main/addClientWindow_actions";
import {SwapTableItemToInactive} from "../../../redux/actions/Main/masters_actions";
import CashBox from "./CashBox";
import ClientInfo from "./ClientInfo";
import back from "../../../assets/img/journal/journal-back.svg";
import {DateTime} from "luxon";
import {MONTHS} from "../../../constants";
import {SetCheckedDate} from "../../Header/Calendar/redux/actions/calendar";


function AddClientWindow({requestMastersWithVisits, ...props}) {
    let master = props.store.defaultMaster
    let tableItemId = props.store.tableItem
    let checkedCalendarDate = props.store_calendar.checkedDate
    const addClientWindow = React.useRef();
    let [chosenMasterId, setChosenMasterId] = useState(master.pk)
    let clientInfoActive = props.store.clientInfoActive

    let [currentDate, setCurrentDate] = useState(null)

    useEffect(() => {
        let year = checkedCalendarDate.getFullYear()
        let month = checkedCalendarDate.getMonth() + 1
        let day = checkedCalendarDate.getDate()
        let date = DateTime.local(year, month, day)
        setCurrentDate(date)
    }, [checkedCalendarDate])

    useEffect(() => {
        let eventHandler = (e) => e.code === 'Escape' && deactivateWindow()
        document.addEventListener('keydown', eventHandler)
        return () => document.removeEventListener('keydown', eventHandler)
    }, [])

    function handleMouseDown(e) {
        let elem = e.currentTarget.parentElement
        elem.style.transform = 'scale(1.005) translate(-50%, -50%)'
        elem.onmousemove = e => {
            elem.style.top = elem.offsetTop + e.movementY + 'px'
            elem.style.left = elem.offsetLeft + e.movementX + 'px'
            document.onmouseup = () => {
                elem.onmousemove = null
                elem.style.transform = 'scale(1) translate(-50%, -50%)'
            }
        }
    }

    function deactivateWindow() {
        props.SwapTableItemToInactive(master.pk, tableItemId)
        props.SetAddClientWindowActive(false)
    }

    function plusDay() {
        let newDate = currentDate.plus({days: 1})
        setCurrentDate(newDate)
        props.SetCheckedDate(new Date(newDate.year, newDate.month - 1, newDate.day))
    }

    function minusDay() {
        let newDate = currentDate.minus({days: 1})
        setCurrentDate(newDate)
        props.SetCheckedDate(new Date(newDate.year, newDate.month - 1, newDate.day))
    }

    return (
        <>
            <div className={`background ${props.store.active && 'active'}`} onClick={deactivateWindow}/>
            <div className="add-client-window"
                 style={{top: props.store.offsetTop, left: props.store.offsetLeft}}
                 onDrag={() => false}
                 ref={addClientWindow}>

                <div className="header-line" onMouseDown={(e) => {
                    handleMouseDown(e)
                }}/>
                <img className='close' src={close} alt="закрыть" onClick={deactivateWindow}/>

                {currentDate &&
                    <p className="day">
                        <span className="left-arrow" onClick={minusDay}><img src={leftArrow} alt="назад"/></span>
                        <span>
                            {currentDate.day} {MONTHS[currentDate.month].slice(0, 3).toLowerCase()}. <br/>
                            {currentDate.weekdayLong}
                        </span>
                        <span className="right-arrow" onClick={plusDay}><img src={rightArrow} alt="вперед"/></span>
                    </p>}

                {clientInfoActive ?
                    <ClientInfo chosenMasterId={chosenMasterId}
                                deactivateWindow={deactivateWindow}
                                currentDate={currentDate}
                                setMasterId={setChosenMasterId}
                                requestMastersWithVisits={requestMastersWithVisits}/> :
                    <>
                        <img className='back-icon' src={back} alt="назад" onClick={() => setClientInfoActive(true)}/>
                        <CashBox requestMastersWithVisits={requestMastersWithVisits}/>
                    </>}
            </div>
        </>
    )
}

export default connect(
    state => ({store: state.Main.addClientWindow, store_calendar: state.calendar}),
    dispatch => ({
        SetCheckedDate: (date) => dispatch(SetCheckedDate(date)),
        SetAddClientWindowActive: (active) => dispatch(SetAddClientWindowActive(active)),
        SwapTableItemToInactive: (name, index) => dispatch(SwapTableItemToInactive(name, index)),
    })
)(AddClientWindow);