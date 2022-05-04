import React, {useEffect, useRef, useState} from "react";
import {connect} from "react-redux";

import {DeactivateBackground} from "../../../redux/actions/Main/addClientWindow_actions";
import {SwapTableItemToInactive} from "../../../redux/actions/Main/masters_actions";
import Time from "./Time";
import {useIMask} from "react-imask";
import {SetClientInfo, UpdateClients} from "../../../redux/actions/Main/clients_actions";
import MastersDropDown from "./MastersDropDown";


function AddClientWindow(props) {
    const addClientWindow = React.useRef();
    const [ opts, setOpts ] = React.useState({ mask: "+{7}(000)000-00-00" });
    const { ref, maskRef } = useIMask(opts);
    let form = useRef();
    let [chosenMaster, setChosenMaster] = useState(props.master)
    let [dropDownVisible, setDropDownVisible] = useState(false)

    useEffect(() => {
        let eventHandler = (e) => e.code === 'Escape' && deactivateWindow()
        document.addEventListener('keydown', eventHandler)
        // setTimeout(() => addClientWindow.current?.classList.add(props.store.orientation))
        return () => document.removeEventListener('keydown', eventHandler)
    }, [])

    useEffect(() => {
        if (props.clientInfo && !props.clientInfo.toMaster) setChosenMaster("Нет")
    }, [props.clientInfo])

    function deactivateWindow() {
        props.SwapTableItemToInactive(props.master, props.index)
        props.DeactivateBackground()
    }

    function handleSubmitForm(e) {
        deactivateWindow()
        e.preventDefault()
        let form = e.target;
        let newClient = {
            master: chosenMaster !== 'Нет' ? chosenMaster : props.master,
            toMaster: chosenMaster !== 'Нет',
            name: form['first-name'].value,
            lastName: form['last-name'].value,
            phone: form['phone'].value,
            timeStart: {
                hour: Number(form['start-hours'].value),
                minutes: form['start-minutes'].value
            },
            timeEnd: {
                hour: Number(form['end-hours'].value),
                minutes: form['end-minutes'].value
            },
            duration: props.store.chosenDuration,
            // gender: form['gender'].value,
            service: form['service'].value,
            comment: form['comment'].value
        }
        props.clientInfo ?
            props.SetClientInfo(
                chosenMaster === 'Нет' ? props.master : chosenMaster,
                props.clientInfo.timeStart.hour,
                props.clientInfo.timeStart.minutes,
                newClient) :
            props.UpdateClients(newClient)
    }

    function handleMouseDown(e) {
        let elem = e.currentTarget.parentElement
        elem.style.transform = 'scale(1.01) translate(-50%, -50%)'
        elem.onmousemove = e => {
            elem.style.top = elem.offsetTop + e.movementY +  'px'
            elem.style.left = elem.offsetLeft + e.movementX + 'px'
            document.onmouseup = () => {
                elem.onmousemove = null
                elem.style.transform = 'scale(1) translate(-50%, -50%)'
            }
        }
    }

    return (
        <>
            <div className={props.store.className} onClick={deactivateWindow}/>
            <div className="add-client-window"
                 style={{top: props.store.offsetTop, left: props.store.offsetLeft}}
                 onDrag={() => false}
                 ref={addClientWindow}>
                <div className="header-line" onMouseDown={(e) => {handleMouseDown(e)}}/>
                <div className="master">
                    <span>Мастер:</span>
                    <div className="master-name"
                         onClick={() => setDropDownVisible(true)}>{chosenMaster}</div>
                    {dropDownVisible && <MastersDropDown setVisible={setDropDownVisible}
                                                         setMaster={setChosenMaster}/>}
                </div>
                <form onSubmit={(e) => handleSubmitForm(e)}
                      onClick={() => setDropDownVisible(false)}
                      ref={form}>
                    <p className="day">15 янв. суббота</p>

                    <Time clientInfo={props.clientInfo}
                          hoursStart={props.tableItem.hour}
                          minutesStart={props.tableItem.minutes}/>
                    <textarea className="comment"
                              defaultValue={props.clientInfo?.comment}
                              name="comment"
                              placeholder="Напишите комментарий к записи..."/>

                    <input className="name"
                           defaultValue={props.clientInfo?.name}
                           name="first-name"
                           type="text"
                           placeholder="Имя"
                           autoComplete="-"/>
                    <input className="last-name"
                           defaultValue={props.clientInfo?.lastName}
                           name="last-name"
                           type="text"
                           placeholder="Фамилия"
                           autoComplete="-"/>
                    <input className="phone"
                           defaultValue={props.clientInfo?.phone}
                           name="phone"
                           type="text"
                           placeholder="Телефон"
                           autoComplete="-"
                           ref={ref}/>
                    <p className="service">
                        <input className="input-service"
                               defaultValue={props.clientInfo?.service}
                               name="service"
                               placeholder="Услуга"/>
                    </p>
                    {/*<div className="gender">*/}
                    {/*    <p>Пол:</p>*/}
                    {/*    <label htmlFor="male" className="male">*/}
                    {/*        <input type="radio" name="gender" value="male" id="male"/>*/}
                    {/*        <span className="checkmark">М</span>*/}
                    {/*    </label>*/}
                    {/*    <label htmlFor="female" className="female">*/}
                    {/*        <input type="radio" name="gender" value="female" id="female"/>*/}
                    {/*        <span className="checkmark">Ж</span>*/}
                    {/*    </label>*/}
                    {/*</div>*/}

                    <input className="confirm" type="submit" value={props.clientInfo ? "Изменить" : "Добавить"}/>
                    <input className="cancel" type="button" value="Отмена" onClick={deactivateWindow}/>
                </form>
            </div>
        </>
    )
}

export default connect(
    state => ({store: state.Main.addClientWindow}),
    dispatch => ({
        DeactivateBackground: () => dispatch(DeactivateBackground()),
        SetClientInfo: (master, hour, minutes, data) => dispatch(SetClientInfo(master, hour, minutes, data)),
        UpdateClients: (data) => dispatch(UpdateClients(data)),
        SwapTableItemToInactive: (name, index) => dispatch(SwapTableItemToInactive(name, index))
    })
)(AddClientWindow);