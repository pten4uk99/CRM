import React from "react";
import {connect} from "react-redux";
import Menu from "./Header/Menu";
import CurrentData from "./Header/CurrentData";
import Calendar from "./Header/Calendar/jsx/Calendar";


function Header(props) {
    return (
        <header>
            <Menu/>
            <div className="calendar__wrapper">
                <Calendar/>
            </div>
            <CurrentData/>
        </header>
    )
}

export default connect(
    state => ({store: state}),
    dispatch => ({})
)(Header);