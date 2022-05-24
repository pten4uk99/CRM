import React from "react";
import ReactDOM from "react-dom";
import {combineReducers, createStore} from "redux";
import {Provider} from "react-redux";


import App from "./components/App";

import "./styles/index.scss";
import Header from "./redux/reducers/Header/Header";
import calendar from "./components/Header/Calendar/redux/reducers/calendar";
import Main from "./redux/reducers/Main";
import paints from "./components/Warehouse/redux/reducers/paints";
import priceList from "./components/PriceList/redux/reducers/priceList";
import additional from "./components/Additional/redux/reducers/additional";
import cashResult from "./redux/reducers/Main/cashResult";

const reducer = combineReducers({
    Header,
    calendar,
    paints,
    priceList,
    cashResult,
    additional,
    Main
})


const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root'));