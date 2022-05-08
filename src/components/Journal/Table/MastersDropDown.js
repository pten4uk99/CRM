import React, {useEffect} from "react";
import {connect} from "react-redux";


function MastersDropDown(props) {

    function handleClick(e) {
        props.setMaster(e.target.innerText)
        props.setVisible(false)
    }

    return (
        <ul className="masters__dropdown">
            <li className="master" onClick={(e) => handleClick(e)}>Нет</li>
            <li className="master" onClick={(e) => handleClick(e)}>Саша</li>
            <li className="master" onClick={(e) => handleClick(e)}>Вика</li>
            <li className="master" onClick={(e) => handleClick(e)}>Ира</li>
        </ul>
    )
}


export default connect(
    state => ({store: state}),
    dispatch => ({})
)(MastersDropDown);