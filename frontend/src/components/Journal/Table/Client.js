import React, {useEffect, useRef, useState} from "react";
import {connect} from "react-redux";

import {SetClientInfo} from "../../../redux/actions/Main/clients_actions";
import {CLIENT_STATUS} from "../../../constants";
import {
    SetAddClientWindowActive,
    SetChosenClientId,
    SetDefaultMaster,
    SetDefaultTimeStart
} from "../../../redux/actions/Main/addClientWindow_actions";
import ClientActions from "./ClientActions";


function Client({master, clientInfo, timeStart, timeEnd, requestMastersWithVisits, ...props}) {
    let addClientWindow = props.store_client_window
    let [tableItem, setTableItem] = useState(null);
    let currentClient = props.store.masters[master.pk];
    let [style, setStyle] = useState({});
    let elem = useRef();
    let [fullSize, setFullSize] = useState(false);

    useEffect(() => {
        if (clientInfo) setStyle({
            height: clientInfo.duration / 15 * 25 + clientInfo.duration / 15
        })
    }, [clientInfo])

    useEffect(() => {
        setTableItem(currentClient.tableItems.filter((item) => {
            return (Number(item.hour) === Number(timeStart.hour)) &&
                (Number(item.minutes) === Number(timeStart.minutes))
        })[0])
    }, [])

    useEffect(() => {
        if (elem?.current) {
            if (fullSize && elem.current?.clientHeight < elem.current?.children[0].clientHeight) {
                elem.current.style.height = elem.current?.children[0].clientHeight + 20 + 'px'
            } else if (!fullSize) elem.current.style.height = style.height + 'px'
        }
    }, [fullSize, elem])

    useEffect(() => {
        if (addClientWindow.active) setFullSize(false)
    }, [addClientWindow.active])

    function handleClick(e) {
        e.stopPropagation()
        setFullSize(true)
    }

    function handleOpenWindow() {
        props.SetDefaultMaster(master.pk, master.name, master.last_name)
        props.SetDefaultTimeStart(tableItem.hour, tableItem.minutes)
        props.SetChosenClientId(clientInfo?.pk)
        props.SetAddClientWindowActive(true)
    }

    function padStart(number) {
        return String(number).padStart(2, '0')
    }

    return tableItem && (
        <>
            <div className={`background ${fullSize && "active"}`} onClick={() => setFullSize(false)}/>
            <div className={`client ${CLIENT_STATUS[clientInfo.status]}`}
                 tabIndex={1}
                 style={fullSize ? {
                     ...style,
                     boxShadow: "0 0 10px rgba(0, 0, 0, .5)",
                     transform: "scale(1.03)",
                     zIndex: "10"
                 } : style}
                 onClick={(e) => handleClick(e)}
                 ref={elem}>
                {!fullSize ?
                    <div className="client__content">
                        <p className="name">{!clientInfo?.either_master ?
                            <span className="master-client"/> :
                            <span className="non-master-client"/>}
                            {clientInfo?.client?.name}</p>
                        <p className="phone">
                            {clientInfo?.client?.phone && phoneToPresentation(clientInfo.client.phone)}
                        </p>
                    </div> :
                    <div className="client__content">
                        <p className="time">
                            {padStart(timeStart.hour)}:{padStart(timeStart.minutes)} - {' '}
                            {padStart(timeEnd.hour)}:{padStart(timeEnd.minutes)}
                        </p>
                        <p className="name wrap">
                            {!clientInfo?.either_master ?
                                <span className="master-client"/> :
                                <span className="non-master-client"/>}
                            {clientInfo?.client?.name}</p>
                        <p className="last-name">{clientInfo?.client?.last_name}</p>
                        <p className="phone mt-10">
                            {clientInfo?.client?.phone && phoneToPresentation(clientInfo.client.phone)}
                        </p>
                        {/*<p className="service">{data.service}</p>*/}
                        <p className="comment">{clientInfo?.comment}</p>

                        <div className="underline"/>

                        <p className="last-visit">
                            <p className="header">Последнее посещение:</p>
                            {clientInfo?.lastVisit ?
                                <>
                                    <div className="date">{clientInfo?.lastVisit.date}</div>
                                    <div className="time">{clientInfo?.lastVisit.time}</div>
                                    <div className="service">{clientInfo?.lastVisit.service}</div>
                                    <div className="duration">{clientInfo?.lastVisit.duration / 60} ч.</div>
                                    <button className="detail">Подробнее...</button>
                                </> :
                                <span>Нет</span>
                            }
                        </p>

                        <ClientActions handleOpenWindow={handleOpenWindow}
                                       visitInfo={clientInfo}
                                       requestMastersWithVisits={requestMastersWithVisits}/>
                    </div>}
            </div>
        </>
    )
}

export default connect(
    state => ({store: state.Main, store_client_window: state.Main.addClientWindow}),
    dispatch => ({
        SetClientInfo: (master, hour, minutes, data) => dispatch(SetClientInfo(master, hour, minutes, data)),
        SetChosenClientId: (clientId) => dispatch(SetChosenClientId(clientId)),
        SetDefaultTimeStart: (hour, minutes) => dispatch(SetDefaultTimeStart(hour, minutes)),
        SetAddClientWindowActive: (active) => dispatch(SetAddClientWindowActive(active)),
        SetDefaultMaster: (pk, name, lastName) => dispatch(SetDefaultMaster(pk, name, lastName))
    })
)(Client);


export function phoneToPresentation(phone) {
    let phoneArr = String(phone).split('')
    let newPhoneArr = []

    newPhoneArr.push('+')
    newPhoneArr.push(phoneArr[0])
    newPhoneArr.push(' ')
    newPhoneArr.push('(')
    newPhoneArr.push(phoneArr[1])
    newPhoneArr.push(phoneArr[2])
    newPhoneArr.push(phoneArr[3])
    newPhoneArr.push(')')
    newPhoneArr.push(' ')
    newPhoneArr.push(phoneArr[4])
    newPhoneArr.push(phoneArr[5])
    newPhoneArr.push(phoneArr[6])
    newPhoneArr.push('-')
    newPhoneArr.push(phoneArr[7])
    newPhoneArr.push(phoneArr[8])
    newPhoneArr.push('-')
    newPhoneArr.push(phoneArr[9])
    newPhoneArr.push(phoneArr[10])

    return newPhoneArr.join('')
}