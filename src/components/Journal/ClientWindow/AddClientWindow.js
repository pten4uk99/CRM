import React, {useEffect, useRef, useState} from "react";
import {connect} from "react-redux";

import {DeactivateBackground} from "../../../redux/actions/Main/addClientWindow_actions";
import {SwapTableItemToInactive} from "../../../redux/actions/Main/masters_actions";
import CashBox from "./CashBox/CashBox";
import ClientInfo from "./ClientInfo/ClientInfo";


function AddClientWindow(props) {
    const addClientWindow = React.useRef();
    let [chosenMaster, setChosenMaster] = useState(props.master)
    let [clientInfoActive, setClientInfoActive] = useState(true)

    useEffect(() => {
        let eventHandler = (e) => e.code === 'Escape' && deactivateWindow()
        document.addEventListener('keydown', eventHandler)
        return () => document.removeEventListener('keydown', eventHandler)
    }, [])

    useEffect(() => {
        if (props.clientInfo) {
            if (!props.clientInfo.toMaster) setChosenMaster("Нет")
            setClientInfoActive(false)
        }
    }, [props.clientInfo])

    function handleMouseDown(e) {
        let elem = e.currentTarget.parentElement
        elem.style.transform = 'scale(1.005) translate(-50%, -50%)'
        elem.onmousemove = e => {
            elem.style.top = elem.offsetTop + e.movementY +  'px'
            elem.style.left = elem.offsetLeft + e.movementX + 'px'
            document.onmouseup = () => {
                elem.onmousemove = null
                elem.style.transform = 'scale(1) translate(-50%, -50%)'
            }
        }
    }

    function deactivateWindow() {
        props.SwapTableItemToInactive(props.master, props.index)
        props.DeactivateBackground()
    }

    return (
        <>
            <div className={props.store.className} onClick={deactivateWindow}/>
            <div className="add-client-window"
                 style={{top: props.store.offsetTop, left: props.store.offsetLeft}}
                 onDrag={() => false}
                 ref={addClientWindow}>

                <div className="header-line" onMouseDown={(e) => {handleMouseDown(e)}}/>

                <div className="tabs">
                    <div className={clientInfoActive ? "client active" : "client"}
                         onClick={() => setClientInfoActive(true)}>Клиент</div>
                    <div className={clientInfoActive ? "cashbox" : "cashbox active"}
                         onClick={() => setClientInfoActive(false)}>Оплата</div>
                </div>

                <p className="day">15 янв. суббота</p>

                {clientInfoActive ?
                    <ClientInfo chosenMaster={chosenMaster}
                                deactivateWindow={deactivateWindow}
                                master={props.master}
                                setMaster={setChosenMaster}
                                clientInfo={props.clientInfo}
                                tableItem={props.tableItem}/> :
                    <CashBox/>}
            </div>
        </>
    )
}

export default connect(
    state => ({store: state.Main.addClientWindow}),
    dispatch => ({
        DeactivateBackground: () => dispatch(DeactivateBackground()),
        SwapTableItemToInactive: (name, index) => dispatch(SwapTableItemToInactive(name, index)),
    })
)(AddClientWindow);