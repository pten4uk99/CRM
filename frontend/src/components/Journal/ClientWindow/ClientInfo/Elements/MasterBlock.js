import React, {useState} from "react";
import {connect} from "react-redux";
import MastersDropDown from "../MastersDropDown";


function MasterBlock({chosenMaster, setMasterId, setEitherMaster,
                         eitherMaster, dropDownVisible, setDropDownVisible, ...props}) {

    function activateMastersDropdown(e) {
        e.stopPropagation();
        setDropDownVisible(true)
    }

    return (
        <div className="master">
            <span>Мастер</span>
            <div className="master-name"
                 onClick={(e) => activateMastersDropdown(e)}>{chosenMaster?.name} {chosenMaster?.last_name}</div>
            {dropDownVisible && <MastersDropDown setVisible={setDropDownVisible}
                                                 setMasterId={setMasterId}/>}
            <div className="either-master">
                <label>Именно к этому мастеру: <input name='either_master'
                                                      onClick={() => setEitherMaster(!eitherMaster)}
                                                      checked={!eitherMaster}
                                                      type="checkbox"/></label>
            </div>
        </div>
    )
}


export default connect(
    state => ({}),
    dispatch => ({})
)(MasterBlock);
