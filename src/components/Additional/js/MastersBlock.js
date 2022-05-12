import React, {useState} from "react";
import {connect} from "react-redux";

import edit from "/src/assets/img/edit.svg"


function MastersBlock(props) {
    let [editActive, setEditActive] = useState(false);

    return (
        <section className="masters__block">
            <img className="edit"
                 src={edit}
                 alt="Редактировать"
                 onClick={() => setEditActive(!editActive)}/>

            <div className="masters-list">
                <div className="master">
                    <span className="name">Саша</span>
                    {editActive && <div className="remove"/>}
                </div>
                <div className="master">
                    <span className="name">Вика</span>
                    {editActive && <div className="remove"/>}
                </div>
                <div className="master">
                    <span className="name">Марина</span>
                    {editActive && <div className="remove"/>}
                </div>
                <div className="master">
                    <span className="name">Ира</span>
                    {editActive && <div className="remove"/>}
                </div>
                <div className="master">
                    <span className="name">Ангелина</span>
                    {editActive && <div className="remove"/>}
                </div>
            </div>

            {editActive && <div className="add-master"/>}

        </section>
    )
}

export default connect(
    state => ({store: state}),
    dispatch => ({})
)(MastersBlock);
