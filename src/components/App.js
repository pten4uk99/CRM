import React from "react";
import {connect} from "react-redux";
import Header from "./Header/Header";


function App(props) {
    return (
        <>
            <Header/>
        </>
    )
}

export default connect(
    state => ({store: state}),
    dispatch => ({})
)(App);