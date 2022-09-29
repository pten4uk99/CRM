import React, {useEffect, useState} from "react";
import {connect} from "react-redux";

import AdditionalMaster from "./MastersBlock/AdditionalMaster";
import {getMasterList} from "../ajax/data";
import ModalWindow from "../../Utils/js/ModalWindow";
import {SetActiveModalWindow} from "../../Utils/redux/modalWindow/modalWindowAction";
import AddMasterModal from "./MastersBlock/AddMasterModal";


function MastersBlock(props) {
    let [mastersList, setMastersList] = useState([])

    useEffect(() => {
        getMasterList(setMastersList)
    }, [])

    let [canAddMaster, setCanAddMaster] = useState(true)

    useEffect(() => {
        if (mastersList.length >= 5) setCanAddMaster(false)
    }, mastersList)

    function onAddMaster() {
        props.SetActiveModalWindow(true)
    }

    return (
        <section className="masters__block">
            <AddMasterModal/>
            <div className="masters">
                <div className="masters-list">
                    {mastersList.length > 0 ?
                        mastersList.map((master, index) => <AdditionalMaster name={master.name}
                                                                             last_name={master.last_name}/>) :
                        <span>Список мастеров пуст</span>}
                </div>
                {canAddMaster && <div className="add-master" onClick={onAddMaster}>Добавить мастера</div>}
            </div>
        </section>
    )
}

export default connect(
    state => ({store: state}),
    dispatch => ({
        SetActiveModalWindow: (active) => dispatch(SetActiveModalWindow(active))
    })
)(MastersBlock);
