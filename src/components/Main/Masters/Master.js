import React, {useEffect} from "react";
import {connect} from "react-redux";
import {
    ActivateWindowToBottom,
    ActivateWindowToTop,
} from "../../../redux/actions/Main/Masters/AddClientWindow";
import {
    AddMaster,
    SwapToActive,
    SwapToInactive
} from "../../../redux/actions/Main/Masters/Master";


function Master(props) {
    useEffect(() => {
        props.AddMaster(props.name)
    }, [])

    return (
        <>
            {props.store[props.name] ?
                <div className="master">
                    <div className="name">{props.name}</div>
                    <div className="table-items">
                        {props.store[props.name].map((elem, index) => <div className={elem.className}
                                           key={index}
                                           onClick={(event) => renderWindow(event, props, index)}/>)}
                    </div>
                </div> : ""}
        </>
    )
}

export default connect(
    state => ({store: state.Main.Masters.Master}),
    dispatch => ({
        AddMaster:
            (name) => dispatch(AddMaster(name)),
        ActivateWindowToTop:
            (top, left) => dispatch(ActivateWindowToTop(top, left)),
        ActivateWindowToBottom:
            (top, left) => dispatch(ActivateWindowToBottom(top, left)),
        SwapToActive:
            (i) => dispatch(SwapToActive(i)),
        SwapToInactive:
            (i) => dispatch(SwapToInactive(i))
    })
)(Master);


function renderWindow(event, props, index) {
    props.SwapToActive(props.name)
    index >= 16 ?
        props.ActivateWindowToTop(event.target.offsetTop - 307, event.target.offsetLeft) :
        props.ActivateWindowToBottom(event.target.offsetTop + 15, event.target.offsetLeft);
}