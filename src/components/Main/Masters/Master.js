import React from "react";
import {connect} from "react-redux";
import {
    SwapWindowToActiveBottom,
    SwapWindowToActiveTop
} from "../../../redux/actions/Main/Masters/AddClientWindow";


function Master(props) {
    return (
        <div className="master">
            <div className="name">Саша</div>
            <div className="table-items">
                {getTables().map(index => <div className="table-item"
                                               key={index}
                                               onClick={props.SwapWindowToActiveBottom}/>)}
            </div>
        </div>
    )
}

export default connect(
    state => ({store: state}),
    dispatch => ({
        SwapWindowToActiveBottom: () => dispatch(SwapWindowToActiveBottom()),
        SwapWindowToActiveTop: () => dispatch(SwapWindowToActiveTop())
    })
)(Master);

function getTables() {
    let list = [];
    for (let i = 1; i <= 26; i++) list.push(i);
    return list;
}
