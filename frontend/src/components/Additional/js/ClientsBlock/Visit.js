import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {visitServices} from "../../ajax/data";
import {SetClientErrorDetail} from "../../../Utils/redux/clientError/clientErrorActions";
import {SetServerErrorDetail} from "../../../Utils/redux/serverError/serverErrorActions";


function Visit({visitInfo, ...props}) {
    let [fullSize, setFullSize] = useState(false)
    let [responseLoaded, setResponseLoaded] = useState(true)

    let [serviceList, setServiceList] = useState([])

    useEffect(() => {
        if (fullSize) {
            visitServices({
                visitId: visitInfo.pk,
                success: successGetVisitServices,
                clientError: clientError,
                serverError: serverError
            })
        }
    }, [fullSize])

    function successGetVisitServices(data) {
        setServiceList(data.data)
    }

    function clientError(detail) {
        setResponseLoaded(true)
        props.SetClientErrorDetail(detail)
    }

    function serverError(detail) {
        setResponseLoaded(true)
        props.SetServerErrorDetail(detail)
    }

    function getTime(time) {
        let format = time.split(':')

        return `${format[0]}:${format[1]}`
    }
    return (
        <div className="visit">
            <div className="shirt-block">
                <p className="date">{visitInfo?.date}</p>
                <span onClick={() => setFullSize(!fullSize)}>{fullSize ? "Скрыть" : "Подробнее..."}</span>
            </div>
            {fullSize &&
                <div className="visit-detail">
                    <div className="first">
                        <div className="money">
                            <div className="card">Переведено на карту: <span>{visitInfo?.card | 0}</span></div>
                            <div className="discount">Скидка: <span>{visitInfo?.discount | 0}</span></div>
                            <div className="paid">Итог: <span>{visitInfo?.paid | 0}</span></div>
                        </div>
                        <div className="time">
                            <div className="start">{visitInfo?.time_start && getTime(visitInfo.time_start)}</div>
                            -
                            <div className="end">{visitInfo?.time_end && getTime(visitInfo.time_end)}</div>
                        </div>
                    </div>

                    <div className="second">
                        <div className="comment">{visitInfo?.comment}</div>
                        <div className="master">
                            <span>Мастер</span>
                            <div className="name">{visitInfo?.master?.name} {visitInfo?.master?.last_name}</div>
                            {visitInfo?.either_master ?
                                <div className="either-master not">К любому мастеру</div> :
                                <div className="either-master">Именно к этому мастеру</div>}
                        </div>
                    </div>

                    <div className="third">
                        <span className='services-text'>Услуги</span>

                        <div className="table">
                            <div className="row header">
                                <div className="price-list">Прайс лист</div>
                                <div className="name">Наименование</div>
                                <div className="price">Цена</div>
                            </div>

                            {serviceList.map((service) => <div className='row'>
                                <div className="price-list">{service.price_item.price_list.name}</div>
                                <div className="name">{service.price_item.name}</div>
                                <div className="price">{service.price_item.price}</div>
                            </div>)}
                        </div>
                    </div>

                </div>}
        </div>
    )
}

export default connect(
    state => ({store: state}),
    dispatch => ({
        SetClientErrorDetail: (detail) => dispatch(SetClientErrorDetail(detail)),
        SetServerErrorDetail: (detail) => dispatch(SetServerErrorDetail(detail)),
    })
)(Visit);
