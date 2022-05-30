import React, {useEffect} from "react";
import {connect} from "react-redux";


function ClientsTooltip(props) {
    return (
        <ul className="clients__tooltip">
            <li className="client">
                <p className="name">Георгий Иванов</p>
                <p className="phone">+7(926)-986-31-49</p>
            </li>
            <li className="client">
                <p className="name">Георгий Иванов2</p>
                <p className="phone">+7(926)-986-31-49</p>
            </li>
            <li className="client">
                <p className="name">Георгий Иванов3</p>
                <p className="phone">+7(926)-986-31-49</p>
            </li>
        </ul>
    )
}


export default connect(
    state => ({store: state}),
    dispatch => ({})
)(ClientsTooltip);
