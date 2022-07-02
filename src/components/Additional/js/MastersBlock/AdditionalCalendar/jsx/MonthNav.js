import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import leftArrow from "/src/assets/img/left-arrow.svg"
import rightArrow from "/src/assets/img/right-arrow.svg"
import {
  SwapMonthToNext,
  SwapMonthToPrev,
} from '../redux/actions/mastersCalendar'
import { MONTHS } from '../utils/calendar'


function MonthNav(props) {
    let calendar = props.store.mastersCalendar
    let currentMonth = calendar.currentDate.getMonth()
    let currentYear = calendar.currentDate.getFullYear()

    function getMonth(monthId) {
        return MONTHS[monthId]
    }

  return (
    <nav className='month-nav'>
      <div onClick={() => props.SwapMonthToPrev()}>
        <img src={leftArrow} alt="Предыдущий месяц"/>
      </div>
      <span>
        {getMonth(currentMonth)} {currentYear}
      </span>
      <div onClick={() => props.SwapMonthToNext()}>
        <img src={rightArrow} alt="Следующий месяц"/>
      </div>
    </nav>
  )
}

export default connect(
  state => ({ store: state }),
  dispatch => ({
    SwapMonthToNext: () => dispatch(SwapMonthToNext()),
    SwapMonthToPrev: () => dispatch(SwapMonthToPrev()),
  })
)(MonthNav)

