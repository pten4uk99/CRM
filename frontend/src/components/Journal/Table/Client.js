import React, {useEffect, useRef, useState} from "react";
import {connect} from "react-redux";
import {SetClientInfo} from "../../../redux/actions/Main/clients_actions";

function Client(props) {
    let [tableItem, setTableItem] = useState(null);
    let currentClient = props.store.masters[props.master];
    let [style, setStyle] = useState({});
    let elem = useRef();
    let [fullSize, setFullSize] = useState(false);
    let data = props.params;

    useEffect(() => {
        if (props.params) setStyle({
            height: props.params.duration / 15 * 25 + props.params.duration / 15
        })
    }, [props.params])

    useEffect(() => {
        setTableItem(currentClient.filter((elem) => {
            return elem.hour === props.params.timeStart.hour &&
                elem.minutes === props.params.timeStart.minutes})[0])
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

    return tableItem && (
        <>
            <div className={`background ${fullSize && "active"}`} onClick={() => setFullSize(false)}/>
            <div className={`client ${data.isDone && "done"}`}
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
                        <p className="name">{data.toMaster ?
                            <span className="master-client"/> :
                            <span className="non-master-client"/>}
                            {data.name}</p>
                        <p className="phone">{data.phone}</p>
                    </div> :
                    <div className="client__content">
                        <p className="time">
                            {data.timeStart.hour}:{data.timeStart.minutes} - {' '}
                            {data.timeEnd.hour}:{data.timeEnd.minutes}
                        </p>
                        <p className="name wrap">
                            {data.toMaster ?
                            <span className="master-client"/> :
                            <span className="non-master-client"/>}
                            {data.name}</p>
                        <p className="last-name">{data.lastName}</p>
                        <p className="phone mt-10">{data.phone}</p>
                        {/*<p className="service">{data.service}</p>*/}
                        <p className="comment">{data.comment}</p>

                        <div className="underline"/>

                        <p className="last-visit">
                            <p className="header">Последнее посещение:</p>
                            {data.lastVisit ?
                                <>
                                    <div className="date">{data.lastVisit.date}</div>
                                    <div className="time">{data.lastVisit.time}</div>
                                    <div className="service">{data.lastVisit.service}</div>
                                    <div className="duration">{data.lastVisit.duration / 60} ч.</div>
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
