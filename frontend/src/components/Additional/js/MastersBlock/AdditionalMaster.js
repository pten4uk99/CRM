import React, {useState} from "react";
import {connect} from "react-redux";

import edit from "/src/assets/img/edit.svg"


function AdditionalMaster({name, last_name, }) {

    let [editName, setEditName] = useState('')


    function handleSetEditName(name) {
        if (editName === name) setEditName('')
        else setEditName(name)
    }

    return (
        <div className="additional-master">
            <span className="name">{name} {last_name}</span>
            {/*<img className={`edit ${editName === name && 'active'}`}*/}
            {/*     src={edit}*/}
            {/*     alt="Редактировать"*/}
            {/*     onClick={() => handleSetEditName(name)}/>*/}
            <div className="delete-master">Удалить</div>
        </div>

    )
}

export default connect(
    state => ({store: state}),
    dispatch => ({})
)(AdditionalMaster);
