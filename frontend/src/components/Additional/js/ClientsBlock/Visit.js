import React, {useState} from "react";
import {connect} from "react-redux";


function Visit(props) {
    let [fullSize, setFullSize] = useState(false)

    return (
        <div className="visit">
            <div className="shirt-block">
                <p className="date">02.14.2022</p>
                <span onClick={() => setFullSize(!fullSize)}>{fullSize ? "Скрыть" : "Подробнее..."}</span>
            </div>
            {fullSize &&
                <div className="visit-detail">
                    <div className="service">
                        <div className="service-name">Услуга: <span>Окрашивание</span></div>
                        <div className="service-detail">
                            <div className="work">Работа: <span>600</span></div>
                            <div className="paints">
                                <div className="category">
                                    <div className="category-name">SoColor Beauty</div>
                                    <div className="paint">7n - 15гр</div>
                                    <div className="paint">7n - 15гр</div>
                                    <div className="paint">7n - 15гр</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="comment">Это комментарий к записи</div>
                    <div className="summary">Итого: <span>3450</span></div>
                </div>}
        </div>
    )
}

export default connect(
    state => ({store: state}),
    dispatch => ({})
)(Visit);
