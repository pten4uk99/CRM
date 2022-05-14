import React, {useState} from "react";
import {connect} from "react-redux";
import ResultPage from "./CashBlock/ResultPage";


function CashBlock(props) {
    return (
        <section className="cash__block">
            <ResultPage/>
        </section>
    )
}

export default connect(
    state => ({store: state}),
    dispatch => ({})
)(CashBlock);
