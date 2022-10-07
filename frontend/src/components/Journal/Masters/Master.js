import React, {useEffect} from "react";
import {connect} from "react-redux";

import {AddMaster} from "../../../redux/actions/Main/masters_actions";
import TableItem from "../Table/TableItem";
import {AddMasterClients} from "../../../redux/actions/Main/clients_actions";


function Master({masterData, requestMastersWithVisits, ...props}) {
    let clients = props.store_clients

    let master = {
        pk: masterData.master.pk,
        name: masterData.master.name,
        last_name: masterData.master.last_name,
    }
    let visits = masterData.visits || []

    useEffect(() => {
        props.AddMaster({pk: master.pk, name: master.name, lastName: master.last_name})
        console.log(visits)
        props.AddMasterClients(master.pk, visits)
    }, [masterData])

    return (
        <>
            {props.store[master.pk] ?
                <div className="master">
                    <div className="name">{master.name} {master.last_name}</div>
                    <div className="table-items">
                        {props.store[master.pk].tableItems.map(
                            (elem, index) => <TableItem key={index}
                                                        className={props.store[master.pk].tableItems[index].className}
                                                        master={master}
                                                        requestMastersWithVisits={requestMastersWithVisits}
                                                        index={index}/>)}
                    </div>
                </div> : ""}
        </>
    )
}

export default connect(
    state => ({store: state.Main.masters, store_calendar: state.calendar, store_clients: state.Main.clients}),
    dispatch => ({
        AddMaster: (pk) => dispatch(AddMaster(pk)),
        AddMasterClients: (masterId, clients) => dispatch(AddMasterClients(masterId, clients))
    })
)(Master);

