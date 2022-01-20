import React, {useEffect} from "react";
import {connect} from "react-redux";
import {DeactivateBackground} from "../../../../../../redux/actions/Main/addClientWindow";
import {SwapToInactive} from "../../../../../../redux/actions/Main/masters";
import Time from "./Time";


function AddClientWindow(props) {
    const addClientWindow = React.createRef();
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
                <p className="header">Новая запись</p> <Time/>
                <p className="day">15 янв. суббота</p>
                <p className="master">Мастер: Вика</p>
                <form>
                    <input className="name" type="text" placeholder="Имя"/>
                    <input className="phone" type="text" placeholder="Телефон"/>
                    <p className="service">
                        <label htmlFor="service">Услуга:</label>
                        <select id="service">
                            <option value="hair">Стрижка</option>
                            <option value="maniqure">Маникюр</option>
                            <option value="cosmetology">Косметология</option>
                        </select>
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