import React, {useEffect} from "react";
import {connect} from "react-redux";


function AddClientWindow(props) {
    const addClientWindow = React.createRef();
    useEffect(() => {
        setTimeout(() => addClientWindow.current.classList.add(props.tableItem.addClientWindow.orientation))
    }, [])

    return (
        <>
            <div className="background"/>
            <div className="add-client-window"
                 style={{top: props.tableItem.addClientWindow.offsetTop,
                     left: props.tableItem.addClientWindow.offsetLeft}}
                 ref={addClientWindow}>
                <h1>Добавить клиента</h1>
                <p>Имя: <input type="text"/></p>
                <input type="submit"/>
            </div>
        </>
    )
}

export default connect(
    state => ({store: state.Main.masters}),
    dispatch => ({})
)(AddClientWindow);