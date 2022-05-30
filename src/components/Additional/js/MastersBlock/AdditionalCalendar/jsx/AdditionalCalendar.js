import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import MonthNav from './MonthNav'
import DaysOfWeek from './DaysOfWeek'
import {SetCheckedDate, SetHoverDate} from "../redux/actions/mastersCalendar";
import DatesList from "./Date/DatesList";


function AdditionalCalendar(props) {
  let [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className='calendar__container'>
        <div className='inside__container'>
          <MonthNav/>
          <DaysOfWeek/>
          <DatesList activeList={props.activeList} colorsList={props.colorsList} editName={props.editName}/>
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
)(AdditionalCalendar)
