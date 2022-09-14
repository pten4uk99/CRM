import React from "react";
import {connect} from "react-redux";

import cardList from "/src/assets/img/warehouse/menu/card-list.svg"
import addMaterial from "/src/assets/img/warehouse/menu/plus-square.svg"
import needReplenishment from "/src/assets/img/warehouse/menu/cart-plus.svg"
import favorites from "/src/assets/img/warehouse/menu/heart.svg"
import hide from "/src/assets/img/warehouse/menu/eye-slash.svg"


function WarehouseMenu(props) {
    return (
        <section className="warehouse__menu">
            <li className="menu-item"><img src={cardList} alt="Все материалы"/></li>
            <li className="menu-item"><img src={addMaterial} alt="Добавить материал"/></li>
            <li className="menu-item"><img src={needReplenishment} alt="Нуждаются в пополнении"/></li>
            <li className="menu-item"><img src={favorites} alt="Избранное"/></li>
            <li className="menu-item"><img src={hide} alt="Не отслеживаемые"/></li>
        </section>
    )
}

export default connect(
    state => ({store: state}),
    dispatch => ({})
)(WarehouseMenu);
