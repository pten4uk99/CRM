import React, {useState} from "react";
import {connect} from "react-redux";

import edit from "/src/assets/img/edit.svg"


function AdditionalMaster({pk, name, lastName, onDelete}) {

    let [editName, setEditName] = useState('')



    function handleSetEditName(name) {
        if (editName === name) setEditName('')
        else setEditName(name)
    }

    return (
        <div className="additional-master">
            <span className="name">{name} {lastName}</span>
            {/*<img className={`edit ${editName === name && 'active'}`}*/}
            {/*     src={edit}*/}
            {/*     alt="Редактировать"*/}
            {/*     onClick={() => handleSetEditName(name)}/>*/}
            <div className="delete-master"
                 onClick={() => onDelete({pk: pk, name: name, lastName: lastName})}>Удалить</div>
        </div>

    )
}

export default connect(
    state => ({store: state}),
    dispatch => ({})
)(AdditionalMaster);
