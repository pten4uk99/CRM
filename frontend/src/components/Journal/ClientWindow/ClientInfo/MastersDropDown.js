import React, {useEffect} from "react";
import {connect} from "react-redux";


function MastersDropDown({setMasterId, ...props}) {
    let mastersList = props.store_masters

    function handleClick(e, masterId) {
        setMasterId(masterId)
        props.setVisible(false)
    }

    return (
        <ul className="masters__dropdown">
            {mastersList.map((master) => <li className="master"
                                             key={master.pk}
                                             onClick={(e) => handleClick(e, master.pk)}>
                {master.name} {master.last_name}
            </li>)}
        </ul>
    )
}


export default connect(
    state => ({store_masters: state.Main.addClientWindow.mastersList}),
    dispatch => ({})
)(MastersDropDown);
