import React from "react";
import {connect} from "react-redux";

import Master from "./Master";


function Masters({responseLoaded, setResponseLoaded, workDayMastersList, requestMastersWithVisits, ...props}) {

    return (
        <>
            <div className="masters-line"/>
            <section className="masters">
                {workDayMastersList.map((masterVisit) => <Master key={masterVisit.master.pk}
                                                                 masterData={masterVisit}
                                                                 requestMastersWithVisits={requestMastersWithVisits}/>)}
            </section>
        </>

    )
}

export default connect(
    state => ({store_calendar: state.calendar}),
    dispatch => ({})
)(Masters);
