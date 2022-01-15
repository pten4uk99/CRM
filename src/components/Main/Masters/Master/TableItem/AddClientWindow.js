import React, {useEffect} from "react";
import {connect} from "react-redux";
import {DeactivateBackground} from "../../../../../redux/actions/Main/addClientWindow";
import {SwapToInactive} from "../../../../../redux/actions/Main/masters";


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
                <h1>Новая запись</h1>
                <h1>15 янв. суббота</h1>
                <h1>Мастер: Вика</h1>
                <form>
                    <p>Имя: <input type="text"/></p>
                    <p>Телефон: <input type="text"/></p>
                    <p>
                        Услуга:
                        <select name="" id="">
                            <option value="hair">Стрижка</option>
                            <option value="maniqure">Маникюр</option>
                            <option value="cosmetology">Косметология</option>
                        </select>
                    </p>
                    <input type="submit" value="Добавить"/>
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