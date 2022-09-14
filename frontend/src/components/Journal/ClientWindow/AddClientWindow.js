import React, {useEffect, useState} from "react";
import {connect} from "react-redux";

import leftArrow from '/src/assets/img/left-arrow.svg'
import rightArrow from '/src/assets/img/right-arrow.svg'
import close from '/src/assets/img/journal/journal-close.svg'
import {DeactivateBackground} from "../../../redux/actions/Main/addClientWindow_actions";
import {SwapTableItemToInactive} from "../../../redux/actions/Main/masters_actions";
import CashBox from "./CashBox";
import ClientInfo from "./ClientInfo";
import back from "../../../assets/img/journal/journal-back.svg";


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
            elem.style.top = elem.offsetTop + e.movementY + 'px'
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

                <div className="header-line" onMouseDown={(e) => {
                    handleMouseDown(e)
                }}/>
                <img className='close' src={close} alt="закрыть" onClick={deactivateWindow}/>

                <p className="day">
                    <span className="left-arrow"><img src={leftArrow} alt="назад"/></span>
                    <span>15 янв. суббота</span>
                    <span className="right-arrow"><img src={rightArrow} alt="вперед"/></span>
                </p>

                {clientInfoActive ?
                    <ClientInfo chosenMaster={chosenMaster}
                                deactivateWindow={deactivateWindow}
                                master={props.master}
                                setMaster={setChosenMaster}
                                clientInfo={props.clientInfo}
                                tableItem={props.tableItem}
                                clientInfoActive={clientInfoActive}
                                setClientInfoActive={setClientInfoActive}/> :
                    <>
                        <img className='back-icon' src={back} alt="назад" onClick={() => setClientInfoActive(true)}/>
                        <CashBox/>
                    </>}
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