import React, {useState} from "react";
import {connect} from "react-redux";


function CashBlock(props) {
    return (
        <section className="cash__block">
            <span>Касса за 12.05.2022:</span>
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
                <p>Чистая прибыль: <span>6000</span></p>
            </div>
        </section>
    )
}

export default connect(
    state => ({store: state}),
    dispatch => ({})
)(CashBlock);
