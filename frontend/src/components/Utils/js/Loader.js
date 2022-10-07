import React from "react";
import {connect} from "react-redux";


function Loader({size, color, top, left, right, bottom, position, ...props}) {
    let borderColor = color || 'rgb(52, 52, 52)'

    return (
        <div className='loader' style={{
            position: position,
            top: top,
            left: left,
            right: right,
            bottom: bottom,
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
