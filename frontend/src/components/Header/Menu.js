import React, {useState} from "react";
import {connect} from "react-redux";

import journal from "/src/assets/img/header/journal.svg"
import journalWhite from "/src/assets/img/header/journal-white.svg"
import warehouse from "/src/assets/img/header/warehouse.svg"
import warehouseWhite from "/src/assets/img/header/warehouse-white.svg"
import additional from "/src/assets/img/header/additional.svg"
import additionalWhite from "/src/assets/img/header/additional-white.svg"
import priceList from "/src/assets/img/header/price-list.svg"
import priceListWhite from "/src/assets/img/header/price-list-white.svg"
import {ActivateMenuItem} from "../../redux/actions/Header/menu";


function Menu(props) {
    let menu = props.store.Header.menu
    let [tooltip, setTooltip] = useState('');

    return (
        <>
            <nav className="header__main-menu">
                <div className={`${menu.journal && "active"}`}
                     onMouseOver={() => setTooltip('Журнал')}
                     onMouseLeave={() => setTooltip('')}
                     onClick={() => props.ActivateMenuItem('journal')}>
                    <img src={menu.journal ? journal : journalWhite} alt="Журнал"/>
                </div>
                <div className={`${menu.warehouse && "active"}`}
                     onMouseOver={() => setTooltip('Склад')}
                     onMouseLeave={() => setTooltip('')}
                     onClick={() => props.ActivateMenuItem('warehouse')}>
                    <img src={menu.warehouse ? warehouse : warehouseWhite} alt="Склад"/>
                </div>
                <div className={`${menu.additional && "active"}`}
                     onMouseOver={() => setTooltip('Дополнительно')}
                     onMouseLeave={() => setTooltip('')}
                     onClick={() => props.ActivateMenuItem('additional')}>
                    <img src={menu.additional ? additional : additionalWhite} alt="Дополнительно"/>
                </div>
                <div className={`${menu.priceList && "active"}`}
                     onMouseOver={() => setTooltip('Прайс')}
                     onMouseLeave={() => setTooltip('')}
                     onClick={() => props.ActivateMenuItem('priceList')}>
                    <img src={menu.priceList ? priceList : priceListWhite} alt="Прайс"/>
                </div>
            </nav>

            <div className="tooltip">{tooltip}</div>
        </>
    )
}

export default connect(
    state => ({store: state}),
    dispatch => ({
        ActivateMenuItem: (item) => dispatch(ActivateMenuItem(item)),
    })
)(Menu);

