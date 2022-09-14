import React, {useState} from "react";
import {connect} from "react-redux";


function ResultPage(props) {
    return (
        <div className="result-page">
            <div className="content">
                <span className="header">Касса за 12.05.2022</span>
                <table>
                    <tr>
                        <th>Мастер</th>
                        <th>Зарплата</th>
                        <th>Общая сумма</th>
                    </tr>
                    <tr>
                        <td>Саша</td>
                        <td>2400</td>
                        <td>5600</td>
                    </tr>
                    <tr>
                        <td>Вика</td>
                        <td>2400</td>
                        <td>5600</td>
                    </tr>
                </table>
                <div className="summary">
                    <p>Карта: <span>5500</span></p>
                    <p>Расход: <span>1250</span></p>
                    <p>Скидка: <span>50</span></p>
                    <p>Всего: <span>12000</span></p>
                    <p>Зарплата: <span>6000</span></p>
                    <p>Остаток: <span>6000</span></p>
                </div>
            </div>
        </div>
    )
}

export default connect(
    state => ({store: state}),
    dispatch => ({})
)(ResultPage);
