import React, {useEffect} from "react";
import {connect} from "react-redux";


function SetPaintInfo(props) {
    let header;
    let subHeader;
    let headerStyle = {}

    switch (props.type) {
        case "add":
            header = "Добавление материала"
            headerStyle = {color: "green"}
            subHeader = "Введите количество материала, которое желаете добавить на склад"
            break
        case "expense":
            header = "Раcход материала"
            headerStyle = {color: "orange"}
            subHeader = "Введите количество материала, которое желаете израсходовать"
            break
    }

    function handleNumber(e) {
        let value = e.target.value
        if (isNaN(Number(value)) || value.length > 3) {
            e.target.value = value.slice(0, value.length - 1)
        }
    }

    function submitHandler(e) {
        e.preventDefault()
        props.setActive(false)
        props.onSubmit(e)
    }

    return (
        <section className="set-paint-info__block"
                 style={props.active ? {display: "inherit"} : {display: "none"}}>
            <p className="header" style={headerStyle}>{header}</p>
            <p className="subheader">{subHeader}</p>
            <form className="set-info" onSubmit={(e) => submitHandler(e)}>
                <label>Упаковок: <input type="text"
                                        name="packages"
                                        onChange={(e) => handleNumber(e)}
                                        className="package"/></label>
                <label>Грамм: <input type="text"
                                     name="quantity"
                                     onChange={(e) => handleNumber(e)}
                                     className="quantity"/></label>
                <button className="confirm" type="submit">Подтвердить</button>
            </form>
        </section>
    )
}

export default connect(
    state => ({store: state}),
    dispatch => ({})
)(SetPaintInfo);
