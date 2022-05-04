import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import {
  SwapMonthToNext,
  SwapMonthToPrev,
} from '../redux/actions/calendar'
import { MONTHS } from '../utils/calendar'


function MonthNav(props) {
    let currentMonth = props.store.calendar.currentDate.getMonth()
    let currentYear = props.store.calendar.currentDate.getFullYear()

    let canNotNextSwap = (currentYear === props.store.calendar.today.getFullYear() + 1 &&
        currentMonth === props.store.calendar.today.getMonth())
    let canNotPrevSwap = (currentYear === props.store.calendar.today.getFullYear() &&
        currentMonth === props.store.calendar.today.getMonth())

    function getMonth(monthId) {
        return MONTHS[monthId]
    }

  return (
    <nav className='month-nav'>
      <div onClick={() => {if (!canNotPrevSwap) {props.SwapMonthToPrev()}}}>
        <img src={canNotPrevSwap ? "": ""} alt=""/>
      </div>
      <span>
        {getMonth(currentMonth)} {currentYear}
      </span>
      <div onClick={() => {if (!canNotNextSwap) props.SwapMonthToNext()}}>
        <img src="" alt=""/>
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

