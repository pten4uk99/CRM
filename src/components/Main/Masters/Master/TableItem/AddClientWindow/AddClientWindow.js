import React, {useEffect} from "react";
import {connect} from "react-redux";
import {DeactivateBackground} from "../../../../../../redux/actions/Main/addClientWindow";
import {SwapToInactive} from "../../../../../../redux/actions/Main/masters";
import Time from "./Time";
import {useIMask} from "react-imask";


function AddClientWindow(props) {
    const addClientWindow = React.createRef();
    const [ opts, setOpts ] = React.useState({ mask: "+{7}(000)000-00-00" });
    const { ref, maskRef } = useIMask(opts);

    useEffect(() => {
        setTimeout(() => addClientWindow.current.classList.add(props.tableItem.addClientWindow.orientation))
    }, [])

    return (
        <>
            <div className={props.store.className} onClick={() => {deactivateWindow(props)}}/>
            <div className="add-client-window"
                 style={{top: props.tableItem.addClientWindow.offsetTop,
                     left: props.tableItem.addClientWindow.offsetLeft}}
                 ref={addClientWindow}>
                <div className="header-line"/>
                <p className="header">Новая запись</p>
                <form>
                    <Time hoursStart="15" minutesStart="30" hoursEnd="16" minutesEnd="00"/>
                    <p className="day">15 янв. суббота</p>
                    <p className="master">Мастер: Вика</p>

                    <input className="name" type="text" placeholder="Имя" autoComplete="-"/>
                    <input className="last-name" type="text" placeholder="Фамилия" autoComplete="-"/>
                    <input className="phone" type="text" placeholder="Телефон" autoComplete="-" ref={ref}/>
                    <div className="gender">
                        <p>Пол:</p>
                        <label htmlFor="male" className="male">
                            <input type="radio" name="gender" value="male" id="male"/>
                            <span className="checkmark">М</span>
                        </label>
                        <label htmlFor="female" className="female">
                            <input type="radio" name="gender" value="female" id="female"/>
                            <span className="checkmark">Ж</span>
                        </label>
                    </div>
                    <p className="service">
                        <input className="input-service" list="service" placeholder="Услуга"/>
                        <datalist id="service">
                            <option value="Стрижка"/>
                            <option value="Маникюр"/>
                            <option value="Косметология"/>
                        </datalist>
                    </p>
                    <input className="confirm" type="submit" value="Добавить"/>
                    <input className="cancel" type="button" value="Отмена"/>
                </form>
            </div>
        </>
    )
}

export default connect(
    state => ({store: state.Main.addClientWindow}),
    dispatch => ({
        DeactivateBackground:
            () => dispatch(DeactivateBackground()),
        SwapToInactive:
            (name, index) => dispatch(SwapToInactive(name, index))
    })
)(AddClientWindow);

function deactivateWindow(props) {
    props.SwapToInactive(props.master, props.index)
    props.DeactivateBackground()
}