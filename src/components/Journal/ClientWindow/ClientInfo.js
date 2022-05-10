import React, {useEffect, useRef, useState} from "react";
import {connect} from "react-redux";

import ClientsTooltip from "./ClientsTooltip";
import Time from "./Time";
import {REPLACER} from "../../../constants";
import {useIMask} from "react-imask";
import {SetClientInfo, UpdateClients} from "../../../redux/actions/Main/clients_actions";
import {DeactivateBackground} from "../../../redux/actions/Main/addClientWindow_actions";
import {SwapTableItemToInactive} from "../../../redux/actions/Main/masters_actions";
import MastersDropDown from "./MastersDropDown";


function ClientInfo(props) {
    let chosenMaster = props.chosenMaster;
    let chosenDuration = props.store.Main.addClientWindow.chosenDuration;
    const [opts, setOpts] = React.useState({ mask: "+{7}(000)000-00-00" });
    const {ref, maskRef} = useIMask(opts);
    let form = useRef();
    let [dropDownVisible, setDropDownVisible] = useState(false)


    function handleSubmitForm(e) {
        props.deactivateWindow()
        e.preventDefault()
        let form = e.target;
        let newClient = {
            master: chosenMaster !== 'Нет' ? chosenMaster : props.master,
            toMaster: chosenMaster !== 'Нет',
            name: form['first-name']?.value,
            lastName: form['last-name']?.value,
            phone: form['phone']?.value,
            timeStart: {
                hour: Number(form['start-hours']?.value),
                minutes: form['start-minutes']?.value
            },
            timeEnd: {
                hour: Number(form['end-hours']?.value),
                minutes: form['end-minutes']?.value
            },
            duration: chosenDuration,
            // gender: form['gender'].value,
            // service: form['service']?.value,
            comment: form['comment']?.value
        }
        props.clientInfo ?
            props.SetClientInfo(
                chosenMaster === 'Нет' ? props.master : chosenMaster,
                props.clientInfo.timeStart.hour,
                props.clientInfo.timeStart.minutes,
                newClient) :
            props.UpdateClients(newClient)
    }

    function handleInputChange(e) {
        let value = e.target.value
        if (value.length === 0) return
        let lastSymbol = value[value.length - 1]
        let lowerSymbol = lastSymbol.toLowerCase()

        if (REPLACER.hasOwnProperty(lowerSymbol)) {
            e.target.value = value.replace(lastSymbol, REPLACER[lowerSymbol])
        }
        if (value.length === 1) e.target.value = e.target.value.toUpperCase()
    }

    return (
        <div className="client-info">

            <ClientsTooltip/>

            <div className="master">
                <span>Мастер:</span>
                <div className="master-name"
                     onClick={() => setDropDownVisible(true)}>{chosenMaster}</div>
                {dropDownVisible && <MastersDropDown setVisible={setDropDownVisible}
                                                     setMaster={props.setMaster}/>}
            </div>

            <form onSubmit={(e) => handleSubmitForm(e)}
                  onClick={() => setDropDownVisible(false)}
                  ref={form}
                  autoComplete="off">

                <Time clientInfo={props.clientInfo}
                      hoursStart={props.tableItem.hour}
                      minutesStart={props.tableItem.minutes}/>

                <textarea className="comment"
                          defaultValue={props.clientInfo?.comment}
                          onChange={(e) => handleInputChange(e)}
                          name="comment"
                          placeholder="Комментарий..."/>

                <textarea className="input name"
                       defaultValue={props.clientInfo?.name}
                       onChange={(e) => handleInputChange(e)}
                       name="first-name"
                       placeholder="Имя"/>
                <textarea className="input last-name"
                       defaultValue={props.clientInfo?.lastName}
                       onChange={(e) => handleInputChange(e)}
                       name="last-name"
                       placeholder="Фамилия"
                       autoComplete="none"/>
                <textarea className="input phone"
                       defaultValue={props.clientInfo?.phone}
                       name="phone"
                       placeholder="Телефон"
                       ref={ref}/>
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
                <input className="cancel" type="button" value="Отмена" onClick={props.deactivateWindow}/>
            </form>
        </div>
    )
}


export default connect(
    state => ({store: state}),
    dispatch => ({
        UpdateClients: (data) => dispatch(UpdateClients(data)),
        DeactivateBackground: () => dispatch(DeactivateBackground()),
        SetClientInfo: (master, hour, minutes, data) => dispatch(SetClientInfo(master, hour, minutes, data)),
        SwapTableItemToInactive: (name, index) => dispatch(SwapTableItemToInactive(name, index))
    })
)(ClientInfo);
