import React from "react";
import {connect} from "react-redux";


function Loader({size, color, top, left, ...props}) {
    let borderColor = color || 'rgb(52, 52, 52)'

    return (
        <div className='loader' style={{
            top: top,
            left: left,
            width: size,
            height: size,
            borderColor: borderColor,
            borderTopColor: 'transparent',
        }}/>
    )
}

export default connect(
    state => ({modalWindow: state.Header.modalWindow}),
    dispatch => ({})
)(Loader);
