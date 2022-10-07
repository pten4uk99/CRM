import React, {useEffect, useRef, useState} from "react";
import {connect} from "react-redux";

import ClientsTooltip from "./ClientInfo/ClientsTooltip";
import Time from "./ClientInfo/Time";
import {REPLACER} from "../../../constants";
import {SetClientInfo} from "../../../redux/actions/Main/clients_actions";
import {SwapTableItemToInactive} from "../../../redux/actions/Main/masters_actions";
import ClientInfoInput from "./ClientInfo/Elements/ClientInfoInput";
import LastVisit from "./ClientInfo/Elements/LastVisit";
import {addNewVisit, editVisit} from "./ajax/data";
import {SetClientErrorDetail} from "../../Utils/redux/clientError/clientErrorActions";
import {SetServerErrorDetail} from "../../Utils/redux/serverError/serverErrorActions";
import Loader from "../../Utils/js/Loader";
import {phoneToPresentation} from "../Table/Client";
import MasterBlock from "./ClientInfo/Elements/MasterBlock";
import ConfirmDeleteVisit from "./ClientInfo/Elements/ConfirmDeleteVisit";
import {SetActiveModalWindow} from "../../Utils/redux/modalWindow/modalWindowAction";


function ClientInfo({chosenMasterId, setMasterId, currentDate, deactivateWindow, requestMastersWithVisits, ...props}) {
    let addClientWindow = props.store_add_client_window
    let defaultTimeStart = addClientWindow.defaultTimeStart
    let [visitInfo, setVisitInfo] = useState(null)
    let [dropDownVisible, setDropDownVisible] = useState(false)
    let [chosenMaster, setChosenMaster] = useState(getChosenMaster(chosenMasterId))
    let [chosenClient, setChosenClient] = useState(null)
    let [confirmDeleteActive, setConfirmDeleteActive] = useState(false)

    let form = useRef();

    let [filterClientsData, setFilterClientsData] = useState({
        name: '',
        lastName: '',
        phone: ''
    })

    let [eitherMaster, setEitherMaster] = useState(true)
    let [responseLoaded, setResponseLoaded] = useState(true)

    useEffect(() => {
        if (confirmDeleteActive) props.SetActiveModalWindow(true)
    }, [confirmDeleteActive])

    useEffect(() => {
        if (addClientWindow.chosenVisitId) {
            let masterVisits = props.store_clients[addClientWindow.defaultMaster.pk]
            for (let visit of masterVisits) {
                if (visit?.pk === addClientWindow.chosenVisitId) setVisitInfo(visit)
            }
        }
    }, [addClientWindow.chosenVisitId])

    useEffect(() => {
        if (visitInfo) {
            setEitherMaster(visitInfo.either_master)
            setChosenClient(visitInfo?.client)
        }
    }, [visitInfo])

    useEffect(() => {
        setChosenMaster(getChosenMaster(chosenMasterId))
    }, [chosenMasterId])

    function getChosenMaster(masterId) {
        let mastersList = addClientWindow.mastersList
        for (let master of mastersList) if (master.pk === chosenMasterId) return master
    }

    function getDatetime(hours, minutes) {
        return `${currentDate.year}-${currentDate.month}-${currentDate.day}T${hours}:${minutes}`
    }

    function onNameChange(e) {
        handleInputChange(e)
        setFilterClientsData({...filterClientsData, name: e.target.value})
    }

    function onLastNameChange(e) {
        handleInputChange(e)
        setFilterClientsData({...filterClientsData, lastName: e.target.value})
    }

    function onPhoneChange(e) {
        setFilterClientsData({...filterClientsData, phone: e.target.value})
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
        formData.set('client_id', chosenClient?.pk || '')

        if (!visitInfo) {
            addNewVisit({
                formData: formData,
                success: successAddVisit,
                clientError: clientError,
                serverError: serverError
            })
        } else {
            editVisit({
                visitId: visitInfo.pk,
                formData: formData,
                success: successAddVisit,
                clientError: clientError,
                serverError: serverError
            })
        }
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

    function modalBlur() {
        if (dropDownVisible) setDropDownVisible(false)
        if (confirmDeleteActive) setConfirmDeleteActive(false)
    }

    return (
        <>
            {confirmDeleteActive && <ConfirmDeleteVisit visitId={visitInfo?.pk}
                                                        requestMastersWithVisits={requestMastersWithVisits}/>}
            <div className="client-info" onClick={modalBlur}>

                <MasterBlock chosenMaster={chosenMaster}
                             eitherMaster={eitherMaster}
                             setEitherMaster={setEitherMaster}
                             setMasterId={setMasterId}
                             dropDownVisible={dropDownVisible}
                             setDropDownVisible={setDropDownVisible}/>

                <form onSubmit={(e) => handleSubmitForm(e)} ref={form} autoComplete="off">

                    <Time visitInfo={visitInfo}
                          hoursStart={defaultTimeStart.hour}
                          minutesStart={defaultTimeStart.minutes}/>

                    <ClientInfoInput label='Имя'
                                     defaultValue={chosenClient?.name}
                                     name='name'
                                     onChange={onNameChange}
                                     disabled={chosenClient}
                                     classNameModifier={`name ${chosenClient && 'disabled'}`}/>
                    <ClientInfoInput label='Фамилия'
                                     defaultValue={chosenClient?.last_name}
                                     name='last_name'
                                     onChange={onLastNameChange}
                                     disabled={chosenClient}
                                     classNameModifier={`last-name ${chosenClient && 'disabled'}`}/>
                    <ClientInfoInput label='Телефон'
                                     defaultValue={chosenClient?.phone && phoneToPresentation(chosenClient.phone)}
                                     name='phone'
                                     onChange={onPhoneChange}
                                     disabled={chosenClient}
                                     classNameModifier={`phone ${chosenClient && 'disabled'}`}
                                     phoneMask={true}/>
                    <ClientInfoInput label='Комментарий'
                                     defaultValue={visitInfo?.comment}
                                     name='comment'
                                     onChange={handleInputChange}
                                     classNameModifier='comment'/>

                    {visitInfo && <input className="delete"
                                         type="button"
                                         value="Удалить"
                                         onClick={() => setConfirmDeleteActive(true)}/>}
                    <input className="confirm" type="submit" value={visitInfo ? "Сохранить" : "Добавить клиента"}/>
                    {!responseLoaded && <Loader size={10} right={30} bottom={70}/>}
                </form>

                <ClientsTooltip filterClientsData={filterClientsData}
                                setChosenClient={setChosenClient}/>
                <LastVisit/>
            </div>
        </>
    )
}


export default connect(
    state => ({store_add_client_window: state.Main.addClientWindow, store_clients: state.Main.clients}),
    dispatch => ({
        SetActiveModalWindow: (active) => dispatch(SetActiveModalWindow(active)),
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