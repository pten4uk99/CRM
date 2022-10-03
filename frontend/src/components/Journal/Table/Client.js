import React, {useEffect, useRef, useState} from "react";
import {connect} from "react-redux";
import {SetClientInfo} from "../../../redux/actions/Main/clients_actions";
import {CLIENT_STATUS} from "../../../constants";

function Client({master, clientInfo, timeStart, timeEnd, ...props}) {
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
                (Number(item.minutes) === Number(timeStart.minutes))})[0])
        }, [])

    useEffect(() => {
        if (elem?.current) {
            if (fullSize && elem.current?.clientHeight < elem.current?.children[0].clientHeight) {
                elem.current.style.height = elem.current?.children[0].clientHeight + 20 + 'px'
            }
            else if (!fullSize) elem.current.style.height = style.height + 'px'
        }
    }, [fullSize, elem])

    function handleClick(e) {
        setFullSize(!fullSize)
    }

    function padStart(number) {
        return String(number).padStart(2, '0')
    }

    return tableItem && (
        <>
            <div className={`background ${fullSize && "active"}`} onClick={() => setFullSize(false)}/>
            <div className={`client ${CLIENT_STATUS[clientInfo.status]}`}
                 tabIndex={1}
                 style={fullSize ? {...style,
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
                        <p className="phone">{clientInfo?.client?.phone}</p>
                    </div> :
                    <div className="client__content">
                        <p className="time">
                            {padStart(timeStart.hour)}:{padStart(timeStart.minutes)} -
                            {padStart(timeEnd.hour)}:{padStart(timeEnd.minutes)}
                        </p>
                        <p className="name wrap">
                            {!clientInfo?.either_master ?
                            <span className="master-client"/> :
                            <span className="non-master-client"/>}
                            {clientInfo?.client?.name}</p>
                        <p className="last-name">{clientInfo?.client?.last_name}</p>
                        <p className="phone mt-10">{clientInfo?.client?.phone}</p>
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
                        <button className="actions" onClick={(e) => props.onClick(e)}>Оплатить/Изменить</button>
                    </div>}
            </div>
        </>
    )
}

export default connect(
    state => ({store: state.Main}),
    dispatch => ({
        SetClientInfo: (master, hour, minutes, data) => dispatch(SetClientInfo(master, hour, minutes, data))
    })
)(Client);
