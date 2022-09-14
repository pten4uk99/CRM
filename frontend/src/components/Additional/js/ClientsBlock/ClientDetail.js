import React, {useState} from "react";
import {connect} from "react-redux";

import leftArrow from "/src/assets/img/cash/arrow-left.svg"
import Visit from "../MastersBlock/Visit";


function ClientDetail(props) {
    return (
        <div className="client-detail">
            <img className="back-arrow"
                 src={leftArrow} alt="Назад"
                 onClick={() => props.setActive(false)}/>

            <div className="content">
                <p className="name">Имя: <span>Георгий</span></p>
                <p className="last-name">Фамилия: <span>Иванович</span></p>
                <p className="phone">Телефон: <span>+7(926)-986-13-24</span></p>

                <p className="visits-header">Посещения</p>

                <div className="visits">
                    <Visit/>
                    <Visit/>
                    <Visit/>
                </div>
            </div>
        </div>
    )
}

export default connect(
    state => ({store: state}),
    dispatch => ({})
)(ClientDetail);
