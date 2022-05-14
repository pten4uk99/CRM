import React from 'react'
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


function Date(props) {

  function getClassName(props) {
    let className = 'calendar-date'

    if (props.store.calendar.currentDate.getMonth() !== props.date.getMonth()) return 'calendar-date inactive'

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
    } else props.SetCheckedDate(props.date)
  }

  function hoverHandler(props, enter) {
    if (props.store.calendar.currentDate.getMonth() !== props.date.getMonth()) {
      return props.SetHoverDate(props.store.calendar.checkedDate)
    }

    enter
      ? props.SetHoverDate(props.date)
      : props.SetHoverDate(props.store.calendar.checkedDate)
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
  })
)(Date)
