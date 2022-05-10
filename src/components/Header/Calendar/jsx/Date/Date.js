import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import {
  SetCheckedDate,
  SetHoverDate,
  SwapMonthToNext,
  SwapMonthToPrev,
} from '../../redux/actions/calendar'
import {
  checkEqualDates,
  checkNeedSwapToNextMonth,
  checkNeedSwapToPrevMonth,
} from '../../utils/date'
import {SwapModalChooseDates} from "../../redux/actions/calendar";


function Date(props) {

  function getClassName(props) {
    let className = 'calendar-date'

    if (props.store.calendar.currentDate.getMonth() !== props.date.getMonth() ||
      props.date - props.store.calendar.today <= - 1000 * 60 * 60 * 24 ||
      props.date - props.store.calendar.today >= 1000 * 60 * 60 * 24 * 365
    ) return 'calendar-date inactive'

    if (checkEqualDates(props.date, props.store.calendar.today))
      className += ' today'
    if (checkEqualDates(props.date, props.store.calendar.checkedDate))
      className += ' active'

    return className
  }

  function clickHandler(props) {

    if (checkNeedSwapToNextMonth(
      props.date, props.store.calendar.currentDate, props.store.calendar.today)) {
      props.SwapMonthToNext()
    } else if (checkNeedSwapToPrevMonth(
      props.date, props.store.calendar.currentDate, props.store.calendar.today)) {
      props.SwapMonthToPrev()
    } else if (!(props.date - props.store.calendar.today <= - 1000 * 60 * 60 * 24) &&
      !(props.date - props.store.calendar.today >= 1000 * 60 * 60 * 24 * 365)
    ) {
      props.SetCheckedDate(props.date)
    }
  }

  function hoverHandler(props, enter) {
    if (props.store.calendar.currentDate.getMonth() !== props.date.getMonth()) {
      return props.SetHoverDate(props.store.calendar.checkedDate)
    }

    enter
      ? props.SetHoverDate(props.date)
      : props.SetHoverDate(props.store.calendar.checkedDate)
  }


  function SwapChooseDates(props) {
    let choseDates = props.store.calendar.modalChooseDates
    let canChoose = props.store.calendar.modalChooseDates.length < 5
    let newDates = []
    let contains = false

    for (let date of choseDates) {
      if (!checkEqualDates(props.date, date)) {
        newDates.push(date)
      } else contains = true
    }
    if (contains) props.SwapModalChooseDates(newDates)
    else if (canChoose) {
      newDates.push(props.date)
      props.SwapModalChooseDates(newDates)
    }
  }


  return (
    <div className={getClassName(props)} 
         onClick={() => clickHandler(props)} 
         onMouseEnter={() => {hoverHandler(props, true)}} 
         onMouseLeave={() => {hoverHandler(props, false)}}>
      <span>{props.date.getDate()}</span>
    </div>
  )
}

export default connect(
  state => ({ store: state }),
  dispatch => ({
    SetCheckedDate: date => dispatch(SetCheckedDate(date)),
    SwapMonthToNext: () => dispatch(SwapMonthToNext()),
    SwapMonthToPrev: () => dispatch(SwapMonthToPrev()),
    SetHoverDate: date => dispatch(SetHoverDate(date)),
    SwapModalChooseDates: dates => dispatch(SwapModalChooseDates(dates)),
    
  })
)(Date)
