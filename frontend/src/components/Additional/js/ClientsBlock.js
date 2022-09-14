import React, {useState} from "react";
import {connect} from "react-redux";
import ClientDetail from "./ClientsBlock/ClientDetail";



function ClientsBlock(props) {
    let [detailActive, setDetailActive] = useState(false)

    return (
        <div className="clients-list__block">
            <textarea className="input search" rows={1} placeholder="Поиск..."/>

            {!detailActive ?
                <div className="clients-list">
                    <div className="client" onClick={() => setDetailActive(true)}>
                        <p className="name">Георгий Иванов</p>
                        <p className="phone">+7(926)-986-13-24</p>
                    </div>
                    <div className="client" onClick={() => setDetailActive(true)}>
                        <p className="name">Василий Пупочкин</p>
                        <p className="phone">+7(926)-986-13-24</p>
                    </div>
                    <div className="client" onClick={() => setDetailActive(true)}>
                        <p className="name">Станислав Ярушин</p>
                        <p className="phone">+7(926)-986-13-24</p>
                    </div>
                    <div className="client" onClick={() => setDetailActive(true)}>
                        <p className="name">Константин Бабушкин</p>
                        <p className="phone">+7(926)-986-13-24</p>
                    </div>
                </div> :
                <ClientDetail setActive={setDetailActive}/>}
        </div>
    )
}

export default connect(
    state => ({store: state}),
    dispatch => ({})
)(ClientsBlock);
