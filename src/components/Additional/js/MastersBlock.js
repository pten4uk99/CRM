import React, {useState} from "react";
import {connect} from "react-redux";

import edit from "/src/assets/img/edit.svg"
import AdditionalCalendar from "./MastersBlock/AdditionalCalendar/jsx/AdditionalCalendar";


function MastersBlock(props) {
    let mastersList = ['Саша', 'Вика', 'Ира', 'Марина', 'Ангелина']
    let colorsList = ['rgb(0, 128, 0)', 'rgb(255, 165, 0)', 'rgb(255, 20, 147)']
    let [activeList, setActiveList] = useState([])
    let [editName, setEditName] = useState('')

    function handleSetActiveList(name) {
        if (activeList.includes(name)) {
            return setActiveList(activeList.filter(elem => elem !== name))
        }
        if (activeList.length >= 3) return false
        setActiveList([...activeList, name])
    }

    function handleSetEditName(name) {
        if (editName === name) setEditName('')
        else setEditName(name)
    }

    return (
        <section className="masters__block">
            <div className="masters">

                <div className="masters-list">
                    {mastersList.map((name, index) => {
                        return <div className="master">
                            <span className="name"
                                  onClick={() => handleSetActiveList(name)}
                                  style={activeList.includes(name) ?
                                      {
                                          backgroundColor: colorsList[activeList.indexOf(name)],
                                          color: "white"
                                      } : {}}>{name}</span>
                            <img className={`edit ${editName === name && 'active'}`}
                                 src={edit}
                                 alt="Редактировать"
                                 onClick={() => handleSetEditName(name)}/>
                        </div>
                    })}
                </div>

            </div>

            <div className="calendar__wrapper masters-calendar">
                <AdditionalCalendar activeList={activeList} colorsList={colorsList} editName={editName}/>
            </div>
        </section>
    )
}

export default connect(
    state => ({store: state}),
    dispatch => ({})
)(MastersBlock);
