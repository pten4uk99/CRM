import React, {useEffect} from "react";
import {connect} from "react-redux";

import {AddMaster} from "../../../../redux/actions/Main/masters";
import TableItem from "./TableItem/TableItem";


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
                        {props.store[props.name].map(
                            (elem, index) => <TableItem key={index}
                                                        className={props.store[props.name][index].className}
                                                        master={props.name}
                                                        index={index}/>)}
                    </div>
                </div> : ""}
        </>
    )
}

export default connect(
    state => ({store: state.Main.masters}),
    dispatch => ({
        AddMaster:
            (name) => dispatch(AddMaster(name)),
    })
)(Master);

