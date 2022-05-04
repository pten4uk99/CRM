import React, { useEffect, useState } from 'react'

import MonthNav from './MonthNav'
import DaysOfWeek from './DaysOfWeek'
import { connect } from 'react-redux'
import DatesListSwappable from './Date/DatesListSwappable'
import {SetCheckedDate, SetHoverDate} from "../redux/actions/calendar";
import DatesList from "./Date/DatesList";


function Calendar(props) {
  let [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className='calendar__container'>
        <div className='inside__container'>
          <MonthNav/>
          <DaysOfWeek/>
          <DatesList/>
        </div>
    </div>
  )
}

export default connect(
  state => ({ store: state }),
  dispatch => ({
    SetHoverDate: (date) => dispatch(SetHoverDate(date)),
    SetCheckedDate: (date) => dispatch(SetCheckedDate(date)),
  })
)(Calendar)
