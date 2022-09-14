import React, {useEffect, useRef, useState} from "react";
import {connect} from "react-redux";

import ClientsTooltip from "./ClientInfo/ClientsTooltip";
import Time from "./ClientInfo/Time";
import {REPLACER} from "../../../constants";
import {useIMask} from "react-imask";
import {SetClientInfo, UpdateClients} from "../../../redux/actions/Main/clients_actions";
import {DeactivateBackground} from "../../../redux/actions/Main/addClientWindow_actions";
import {SwapTableItemToInactive} from "../../../redux/actions/Main/masters_actions";
import MastersDropDown from "./ClientInfo/MastersDropDown";
import {onFormSubmit} from "./ClientInfo/services/utils";
import ClientInfoInput from "./ClientInfo/Elements/ClientInfoInput";
import LastVisit from "./ClientInfo/Elements/LastVisit";


function ClientInfo(props) {
    let chosenMaster = props.chosenMaster;
    let chosenDuration = props.store.Main.addClientWindow.chosenDuration;
    let form = useRef();
    let [dropDownVisible, setDropDownVisible] = useState(false)


    function handleSubmitForm(e) {
        props.deactivateWindow()
        e.preventDefault()
        onFormSubmit(
            e, chosenMaster, chosenDuration, props.clientInfo,
            props.SetClientInfo, props.UpdateClients
        )
    }

    return (
        <div className="client-info" onClick={() => setDropDownVisible(false)}>

            <div className="master">
                <span>Мастер</span>
                <div className="master-name"
                     onClick={(e) => {
                         e.stopPropagation();
                         setDropDownVisible(true)
                     }}>{chosenMaster}</div>
                {dropDownVisible && <MastersDropDown setVisible={setDropDownVisible}
                                                     setMaster={props.setMaster}/>}
            </div>

            <form onSubmit={(e) => handleSubmitForm(e)} ref={form} autoComplete="off">

                <Time clientInfo={props.clientInfo}
                      hoursStart={props.tableItem.hour}
                      minutesStart={props.tableItem.minutes}/>

                <ClientInfoInput label='Имя'
                                 defaultValue={props.clientInfo?.name}
                                 name='first-name'
                                 onChange={handleInputChange}
                                 classNameModifier='name'/>
                <ClientInfoInput label='Фамилия'
                                 defaultValue={props.clientInfo?.lastName}
                                 name='last-name'
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



                <input className="payment" type="button" value="Оплата" onClick={() => props.setClientInfoActive(false)}/>
                <input className="confirm" type="submit" value={props.clientInfo ? "Изменить" : "Добавить клиента"}/>
            </form>

            <ClientsTooltip/>
            <LastVisit/>
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