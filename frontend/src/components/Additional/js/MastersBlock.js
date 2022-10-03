import React, {useEffect, useState} from "react";
import {connect} from "react-redux";

import {deleteMaster, getMasterList} from "../ajax/data";
import AddMasterModal from "./MastersBlock/AddMasterModal";
import {SetClientErrorDetail} from "../../Utils/redux/clientError/clientErrorActions";
import {SetServerErrorDetail} from "../../Utils/redux/serverError/serverErrorActions";
import MastersListPresentation from "./MastersBlock/presentation/MastersListPresentation";
import Loader from "../../Utils/js/Loader";
import DeleteMasterModal from "./MastersBlock/DeleteMasterModal";
import {SetActiveModalWindow} from "../../Utils/redux/modalWindow/modalWindowAction";
import {adaptMasterList} from "../ajax/adapters";


function MastersBlock(props) {
    let [mastersList, setMastersList] = useState([])
    let [responseLoaded, setResponseLoaded] = useState(false)
    let [errorDataLoading, setErrorDataLoading] = useState(false)
    let [masterToDelete, setMasterToDelete] = useState({pk: null, name: null, lastName: null})
    let [masterToAdd, setMasterToAdd] = useState(false)

    useEffect(() => {
        getMasterList({
            success: successGetMastersResponse,
            serverError: serverError,
            clientError: clientError
        })
    }, [])

    function onAddMaster(newMaster) {
        setMastersList([...mastersList, newMaster])
        setMasterToAdd(false)
    }

    function removeMaster(master) {
        setMastersList(mastersList.filter((masterObj) => masterObj.pk !== master.pk))
    }

    function onDeleteConfirm() {
        deleteMaster({
            masterId: masterToDelete.pk,
            success: successDeleteMasterResponse,
            clientError: clientError,
            serverError: serverError
        })
        setMasterToDelete({pk: null, name: null, lastName: null})
    }

    function onMasterDeleteClick(master) {
        props.SetActiveModalWindow(true)
        setMasterToDelete(master)
    }

    function successGetMastersResponse(data) {
        setResponseLoaded(true)
        setMastersList(adaptMasterList(data.data))
    }

    function successDeleteMasterResponse(data) {
        setResponseLoaded(true)
        removeMaster(adaptMasterList(data.data)[0])
    }

    function clientError(detail) {
        setResponseLoaded(true)
        props.SetClientErrorDetail(detail)
    }

    function serverError(detail) {
        setResponseLoaded(true)
        setErrorDataLoading(true)
        props.SetServerErrorDetail(detail)
    }

    return (
        <section className="masters__block">
            {masterToAdd && <AddMasterModal addMaster={onAddMaster}
                                            onClose={() => setMasterToAdd(false)}/>}
            {masterToDelete.pk && <DeleteMasterModal master={masterToDelete}
                                                     onDeleteConfirm={onDeleteConfirm}
                                                     onClose={() => setMasterToDelete({...masterToDelete, pk: null})}/>}

            <div className="masters">
                {responseLoaded ?
                    <MastersListPresentation mastersList={mastersList}
                                             setMasterToDelete={onMasterDeleteClick}
                                             setMasterToAdd={setMasterToAdd}
                                             errorDataLoading={errorDataLoading}/> :
                    <Loader size={50} position={'relative'}/>}
            </div>
        </section>
    )
}

export default connect(
    state => ({store: state}),
    dispatch => ({
        SetActiveModalWindow: (active) => dispatch(SetActiveModalWindow(active)),
        SetClientErrorDetail: (detail) => dispatch(SetClientErrorDetail(detail)),
        SetServerErrorDetail: (detail) => dispatch(SetServerErrorDetail(detail)),
    })
)(MastersBlock);
