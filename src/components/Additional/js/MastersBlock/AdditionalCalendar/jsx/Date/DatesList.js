import React from 'react'
import { connect } from 'react-redux'

import { getCalendar } from '../../utils/calendar'
import Date from './Date'

function DatesList(props) {
  let mastersCalendar = props.store.mastersCalendar
  let year = mastersCalendar.currentDate.getFullYear()
  let month = mastersCalendar.currentDate.getMonth()
  let calendar = getCalendar(year, month)

  return (
    <section className='dates__list'>
      {calendar.map((date, index) => {
        return <Date key={index}
                     date={date}
                     activeList={props.activeList}
                     colorsList={props.colorsList}
                     editName={props.editName}/>
      })}
    </section>
  )
}

export default connect(
  state => ({ store: state }),
  dispatch => ({})
)(DatesList)

