import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import ClientDetail from "./ClientsBlock/ClientDetail";
import {getClientList} from "../../Journal/ClientWindow/ajax/data";
import {phoneToPresentation} from "../../Journal/Table/Client";


function ClientsBlock(props) {
    let [clientsList, setClientsList] = useState([])
    let [chosenClient, setChosenClient] = useState(null)

    useEffect(() => {
        getClientList({
            name: '',
            lastName: '',
            phone: '',
            success: successGetClients,
            clientError: clientError,
            serverError: serverError,
        })
    }, [])

    function successGetClients(data) {
        setClientsList(data.data)
    }

    function clientError(msg) {
        console.log(msg)
    }

    function serverError(msg) {
        console.log(msg)
    }


    return (
        <div className="clients-list__block">
            <textarea className="input search" rows={1} placeholder="Поиск..."/>

            {!chosenClient ?
                <div className="clients-list">
                    {clientsList.map((client) => <div className="client" onClick={() => setChosenClient(client)}>
                        <p className="name">{client.name} {client.last_name}</p>
                        <p className="phone">{phoneToPresentation(client.phone)}</p>
                    </div>)}
                </div> :

                <ClientDetail clientId={chosenClient.pk} setChosenClient={setChosenClient}/>}
        </div>
    )
}

export default connect(
    state => ({store: state}),
    dispatch => ({})
)(ClientsBlock);
