import React from "react";
import {connect} from "react-redux";


function Main(props) {
    return (
        <main>
            <article className="journal">
                <div className="master">csdc</div>
                <div className="master">beer</div>
                <div className="master">reverv</div>
            </article>
        </main>
    )
}

export default connect(
    state => ({store: state}),
    dispatch => ({})
)(Main);