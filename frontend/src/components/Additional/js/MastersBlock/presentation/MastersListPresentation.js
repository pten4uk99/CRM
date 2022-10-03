import React, {useEffect, useState} from "react";
import {connect} from "react-redux";

import AdditionalMaster from "../AdditionalMaster";
import {SetActiveModalWindow} from "../../../../Utils/redux/modalWindow/modalWindowAction";


function MastersListPresentation({mastersList, errorDataLoading, setMasterToDelete, setMasterToAdd, ...props}) {
    let [canAddMaster, setCanAddMaster] = useState(true)

    useEffect(() => {
        if (mastersList.length >= 5 || errorDataLoading) setCanAddMaster(false)
    }, [mastersList, errorDataLoading])

    function onAddMaster() {
        setMasterToAdd(true)
        props.SetActiveModalWindow(true)
    }

    return (
        <>
            {mastersList.length > 0 ?
                <div className="masters-list">
                    {mastersList.map(master => <AdditionalMaster name={master.name}
                                                                 key={master.pk}
                                                                 pk={master.pk}
                                                                 onDelete={setMasterToDelete}
                                                                 lastName={master.last_name}/>)}
                </div> :
                errorDataLoading ?
                    <span className='empty-list' style={{color: "red"}}>Ошибка загрузки данных</span> :
                    <span className='empty-list'>Список мастеров пуст</span>}

            {canAddMaster && <div className="add-master" onClick={onAddMaster}>Добавить мастера</div>}
        </>
    )
}

export default connect(
    state => ({store: state}),
    dispatch => ({
        SetActiveModalWindow: (active) => dispatch(SetActiveModalWindow(active)),
    })
)(MastersListPresentation);
