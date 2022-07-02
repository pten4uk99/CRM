import React from 'react'
import { connect } from 'react-redux'

import {
  SetCheckedDate,
  SetHoverDate,
  SwapMonthToNext,
  SwapMonthToPrev,
} from '../../redux/actions/mastersCalendar'
import {
  checkEqualDates,
  checkNeedSwapToNextMonth,
  checkNeedSwapToPrevMonth,
} from '../../utils/date'


function Date(props) {
  let calendar = props.store.mastersCalendar

  function getClassName(props) {
    let className = 'calendar-date'

    if (calendar.currentDate.getMonth() !== props.date.getMonth()) return 'calendar-date inactive'

    if (checkEqualDates(props.date, calendar.today))
      className += ' today'
    if (checkEqualDates(props.date, calendar.checkedDate))
      className += ' active'

    return className
  }

  function clickHandler(props) {

    if (checkNeedSwapToNextMonth(
      props.date, calendar.currentDate, calendar.today)) {
      props.SwapMonthToNext()
    } else if (checkNeedSwapToPrevMonth(
      props.date, calendar.currentDate, calendar.today)) {
      props.SwapMonthToPrev()
    } else props.SetCheckedDate(props.date)
  }

  function hoverHandler(props, enter) {
    if (calendar.currentDate.getMonth() !== props.date.getMonth()) {
      return props.SetHoverDate(calendar.checkedDate)
    }

    enter
      ? props.SetHoverDate(props.date)
      : props.SetHoverDate(calendar.checkedDate)
  }

  return (
    <div className={getClassName(props)}
         onClick={() => clickHandler(props)}
         onMouseEnter={() => {hoverHandler(props, true)}}
         onMouseLeave={() => {hoverHandler(props, false)}}>
      <span>{props.date.getDate()}</span>

      {(props.date.getDate() === 9 || props.date.getDate() === 15 || props.date.getDate() === 18) &&
          <div className="calendar-masters">
            {props.activeList.map((name, index) => {
              return <div className="calendar-master"
                   style={{backgroundColor: props.colorsList[index % 4]}}>{name}</div>})}
          </div>}
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
