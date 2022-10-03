import React, {useEffect, useRef, useState} from "react";
import {connect} from "react-redux";

import ClientsTooltip from "./ClientInfo/ClientsTooltip";
import Time from "./ClientInfo/Time";
import {REPLACER} from "../../../constants";
import {SetClientInfo} from "../../../redux/actions/Main/clients_actions";
import {SwapTableItemToInactive} from "../../../redux/actions/Main/masters_actions";
import MastersDropDown from "./ClientInfo/MastersDropDown";
import ClientInfoInput from "./ClientInfo/Elements/ClientInfoInput";
import LastVisit from "./ClientInfo/Elements/LastVisit";
import {addNewVisit} from "./ajax/data";
import {SetClientErrorDetail} from "../../Utils/redux/clientError/clientErrorActions";
import {SetServerErrorDetail} from "../../Utils/redux/serverError/serverErrorActions";


function ClientInfo({chosenMasterId, setMasterId, currentDate, deactivateWindow, requestMastersWithVisits, ...props}) {
    let addClientWindow = props.store_add_client_window
    let defaultTimeStart = addClientWindow.defaultTimeStart
    let [chosenMaster, setChosenMaster] = useState(getChosenMaster(chosenMasterId))
    let chosenDuration = addClientWindow.chosenDuration
    let form = useRef();
    let [dropDownVisible, setDropDownVisible] = useState(false)
    let [eitherMaster, setEitherMaster] = useState(true)
    let [responseLoaded, setResponseLoaded] = useState(true)


    useEffect(() => {setChosenMaster(getChosenMaster(chosenMasterId))}, [chosenMasterId])

    function getChosenMaster(masterId) {
        let mastersList = addClientWindow.mastersList
        for (let master of mastersList) if (master.pk === chosenMasterId) return master
    }

    function getDatetime(hours, minutes) {
        return `${currentDate.year}-${currentDate.month}-${currentDate.day}T${hours}:${minutes}`
    }

    function handleSubmitForm(e) {
        setResponseLoaded(false)
        e.preventDefault()

        let formData = new FormData(e.target)
        let startHours = formData.get('start_hours')
        let startMinutes = formData.get('start_minutes')
        let endHours = formData.get('end_hours')
        let endMinutes = formData.get('end_minutes')

        let datetimeStart = getDatetime(startHours, startMinutes)
        let datetimeEnd = getDatetime(endHours, endMinutes)

        formData.set('datetime_start', datetimeStart)
        formData.set('datetime_end', datetimeEnd)
        formData.set('master_id', chosenMasterId)
        formData.set('either_master', eitherMaster)


        addNewVisit({
            formData: formData,
            success: successAddVisit,
            clientError: clientError,
            serverError: serverError
        })

        // onFormSubmit(
        //     e, chosenMaster, chosenDuration, props.clientInfo,
        //     props.SetClientInfo, props.UpdateClients
        // )
    }

    function activateMastersDropdown(e) {
        e.stopPropagation();
        setDropDownVisible(true)
    }

    function successAddVisit() {
        deactivateWindow()
        requestMastersWithVisits()
        setResponseLoaded(true)
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
        <div className="client-info" onClick={() => setDropDownVisible(false)}>

            <div className="master">
                <span>Мастер</span>
                <div className="master-name"
                     onClick={(e) => activateMastersDropdown(e)}>{chosenMaster?.name} {chosenMaster?.last_name}</div>
                {dropDownVisible && <MastersDropDown setVisible={setDropDownVisible}
                                                     setMasterId={setMasterId}/>}
                <div className="either-master">
                    <label>Именно к этому мастеру: <input name='either_master'
                                                          onClick={() => setEitherMaster(!eitherMaster)}
                                                          type="checkbox"/></label>
                </div>
            </div>

            <form onSubmit={(e) => handleSubmitForm(e)} ref={form} autoComplete="off">

                <Time clientInfo={props.clientInfo}
                      hoursStart={defaultTimeStart.hour}
                      minutesStart={defaultTimeStart.minutes}/>

                <ClientInfoInput label='Имя'
                                 defaultValue={props.clientInfo?.name}
                                 name='name'
                                 onChange={handleInputChange}
                                 classNameModifier='name'/>
                <ClientInfoInput label='Фамилия'
                                 defaultValue={props.clientInfo?.lastName}
                                 name='last_name'
                                 onChange={handleInputChange}
                                 classNameModifier='last-name'/>
                <ClientInfoInput label='Телефон'
                                 defaultValue={props.clientInfo?.phone}
                                 name='phone'
                                 classNameModifier='phone'
                                 phoneMask={true}/>
                <ClientInfoInput label='Комментарий'
                                 defaultValue={props.clientInfo?.comment}
                                 name='comment'
                                 onChange={handleInputChange}
                                 classNameModifier='comment'/>


                <input className="payment" type="button" value="Оплата"
                       onClick={() => props.setClientInfoActive(false)}/>
                <input className="confirm" type="submit" value={props.clientInfo ? "Изменить" : "Добавить клиента"}/>
            </form>

            <ClientsTooltip/>
            <LastVisit/>
        </div>
    )
}


export default connect(
    state => ({store_add_client_window: state.Main.addClientWindow}),
    dispatch => ({
        SetClientInfo: (master, hour, minutes, data) => dispatch(SetClientInfo(master, hour, minutes, data)),
        SwapTableItemToInactive: (name, index) => dispatch(SwapTableItemToInactive(name, index)),
        SetClientErrorDetail: (detail) => dispatch(SetClientErrorDetail(detail)),
        SetServerErrorDetail: (detail) => dispatch(SetServerErrorDetail(detail)),
    })
)(ClientInfo);


export function handleInputChange(e) {
    let value = e.target.value
    if (value.length === 0) return
    let lastSymbol = value[value.length - 1]
    let lowerSymbol = lastSymbol.toLowerCase()

    if (REPLACER.hasOwnProperty(lowerSymbol)) {
        e.target.value = value.replace(lastSymbol, REPLACER[lowerSymbol])
    }
    if (value.length === 1) e.target.value = e.target.value.toUpperCase()
}