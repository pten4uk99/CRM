import React, {useEffect, useState} from "react";
import {connect} from "react-redux";

import Coloring from "./Coloring";
import PriceTable from "./PriceTable";


function Service(props) {
    let [serviceList, setServiceList] = useState([
        {
            header: 'Мужской зал',
            service_index: props.index,
            price_list: [
                {
                    name: 'Стрижка модельная',
                    price: '600'
                },
                {
                    name: 'Стрижка квадратная',
                    price: '500'
                },

            ]
        },
        {header: 'Стрижка женская', price_list: [
            {
                name: 'Стрижка + обдув',
                priceShirt: '800',
                priceMiddle: '1000',
                priceLong: '1000',
            },

        ]},
        {header: 'Укладка', price_list: []},
        {header: 'Маникюр', price_list: []},
        {header: 'Косметология', price_list: []}
    ])
    let [activeService, setActiveService] = useState(null)

    useEffect(() => {
        setActiveService(serviceList.filter((elem) => elem?.header === 'Мужской зал')[0])
    }, [])

    return (
        <div className="add-client-window__service">
            <div className="service-list">
                <div className={`service-list__item coloring ${activeService === 'Окрашивание' && 'active'}`}
                     onClick={() => setActiveService('Окрашивание')}>
                    Окрашивание
                    </div>
                {serviceList.map((service, index) => {
                    return <div className={`service-list__item ${service?.header === activeService?.header && 'active'}`}
                                key={index}
                                onClick={() => setActiveService(service)}>
                        {service?.header}
                    </div>
                })}
            </div>

            {activeService === 'Окрашивание' ?
                <Coloring/> :
                <PriceTable data={activeService}/>}
        </div>
    )
}

export default connect(
    state => ({store: state}),
    dispatch => ({})
)(Service);
