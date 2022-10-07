import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {phoneToPresentation} from "../../Table/Client";
import {getClientList} from "../ajax/data";
import Loader from "../../../Utils/js/Loader";


function ClientsTooltip({filterClientsData, setChosenClient, ...props}) {
    let [responseLoaded, setResponseLoaded] = useState(true)
    let [clientsList, setClientsList] = useState([])
    let [timeOutId, setTimeOutId] = useState(null)


    useEffect(() => {
        if (filterClientsData.name.length > 1 ||
            filterClientsData.lastName.length > 1 ||
            filterClientsData.phone.length > 4) {
            clearTimeout(timeOutId)
            setTimeOutId(setTimeout(() => {
                setResponseLoaded(false)
                getClientList({
                    name: filterClientsData.name,
                    lastName: filterClientsData.lastName,
                    phone: filterClientsData.phone,
                    success: successFilterClients,
                    clientError: console.log,
                    serverError: console.log
                })
            }, 1000))
        }
    }, [filterClientsData])

    function successFilterClients(data) {
        setResponseLoaded(true)
        setClientsList(data.data)
    }

    return (
        <ul className="clients__tooltip">
            {!responseLoaded ?
                <Loader size={20} top={70} left={125} position='relative'/> :
                clientsList.length > 0 ?
                    clientsList.map((client) => <li key={client.pk}
                                                    onClick={() => setChosenClient(client)}
                                                    className="client">
                        <p className="name">{client.name} {client.last_name}</p>
                        <p className="phone">{phoneToPresentation(client.phone)}</p>
                    </li>) :
                    <div style={{
                        position: "relative",
                        top: 70,
                        textAlign: "center",
                        color: 'rgb(103,103,103)'
                    }}>Совпадений не найдено</div>
            }

        </ul>
    )
}


export default connect(
    state => ({}),
    dispatch => ({})
)(ClientsTooltip);
