import React, {useEffect} from "react";
import {connect} from "react-redux";


function AddClientWindow(props) {
    const addClientWindow = React.createRef();
    useEffect(() => {
        addClientWindow.current.classList.add(props.store.orientation)
    }, [])

    return (
        <div className="add-client-window"
             style={{top: props.store.offsetTop, left: props.store.offsetLeft}}
             ref={addClientWindow}>
            <h1>Добавить клиента</h1>
            <p>Имя: <input type="text"/></p>
            <input type="submit"/>
        </div>
    )
}

export default connect(
    state => ({store: state.Main.addClientWindow}),
    dispatch => ({})
)(AddClientWindow);