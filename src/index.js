import React from "react";
import ReactDOM from "react-dom";
import {combineReducers, createStore} from "redux";
import {Provider} from "react-redux";


import App from "./components/App";

import "./styles/index.scss";
import Header from "./redux/reducers/Header/Header";
import calendar from "./components/Header/Calendar/redux/reducers/calendar";
import Main from "./redux/reducers/Main";
import {paints} from "./components/Warehouse/redux/reducers/paints";

const reducer = combineReducers({
    Header,
    calendar,
    paints,
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