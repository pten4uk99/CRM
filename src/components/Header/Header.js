import React from "react";
import {connect} from "react-redux";
import Menu from "./Menu";
import CurrentData from "./CurrentData";


function Header(props) {
    return (
        <header>
            <Menu/>
            <CurrentData/>
        </header>
    )
}

export default connect(
    state => ({store: state}),
    dispatch => ({})
)(Header);