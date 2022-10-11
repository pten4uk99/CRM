import React, {useEffect, useState} from "react";
import {connect} from "react-redux";

import coloringIcon from '/src/assets/img/journal/coloring-icon.svg'
import coloringIconWhite from '/src/assets/img/journal/coloring-icon-white.svg'
import Coloring from "./Coloring";
import PriceTable from "./PriceTable";
import {getPriceLists} from "../../../PriceList/ajax/data";


function Service({...props}) {
    let [isColoring, setIsColoring] = useState(false)
    let [activeService, setActiveService] = useState(null)
    let [serviceList, setServiceList] = useState([])

    useEffect(() => {
        if (serviceList.length > 0) setActiveService(serviceList[0])
    }, [serviceList])

    useEffect(() => {
        getPriceLists({
            success: successGetPriceLists,
            clientError: console.log,
            serverError: console.log
        })
    }, [])

    function successGetPriceLists(data) {
        setServiceList(data.data)
    }

    return (
        <div className="add-client-window__service">
            <div className={`coloring ${isColoring && 'active'}`}
                 onClick={() => setIsColoring(!isColoring)}>
                <img src={isColoring ? coloringIconWhite : coloringIcon} alt="окрашивание"/>
            </div>
            <div className="service-list__wrapper">
                <div className="service-list">
                    {serviceList.map((service, index) => {
                        return <div className={`service-list__item ${service?.pk === activeService?.pk && 'active'}`}
                                    key={index}
                                    onClick={() => setActiveService(service)}>
                            {service?.name}
                        </div>})}
                </div>
            </div>
            {isColoring ?
                <Coloring/> :
                <PriceTable activePriceList={activeService}/>}
        </div>
    )
}

export default connect(
    state => ({store: state}),
    dispatch => ({})
)(Service);
