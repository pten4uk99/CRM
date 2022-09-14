import React from "react";
import {connect} from "react-redux";


function LastVisit(props) {
    return (
       <div className='client-info__last-visit' style={{textAlign: 'center', color: 'rgba(0, 0, 0, .3)'}}>
           тута будет последнее посещение потом как нить...
       </div>
    )
}


export default connect(
    state => ({store: state}),
    dispatch => ({})
)(LastVisit);
