let date = new Date()

const initialState = {
  today: date,
  currentDate: date,
  checkedDate: date,
  hoverDate: undefined,
  chosenDuration: 60,
  modalChooseDates: [],
  swap: false,
  swapSideClass: '',
}

export default function mastersCalendar(state = initialState, action) {
  switch (action.type) {
    case 'SET_MASTERS_CALENDAR_HOVER_DATE':
      return {
        ...state,
        hoverDate: action.payload.date,
      }
    case 'NEXT_MASTERS_CALENDAR_MONTH':
      return {
        ...state,
        swap: true,
        swapSideClass: 'swap-left',
        currentDate: new Date(
          state.currentDate.getFullYear(),
          state.currentDate.getMonth() + 1
        ),
      }
    case 'PREV_MASTERS_CALENDAR_MONTH':
      return {
        ...state,
        swap: true,
        swapSideClass: 'swap-right',
        currentDate: new Date(
          state.currentDate.getFullYear(),
          state.currentDate.getMonth() - 1
        ),
      }
    case 'SET_MASTERS_CALENDAR_ACTIVE_DATE':
      return {
        ...state,
        checkedDate: action.payload.date,
      }
    case 'DEACTIVATE_MASTERS_CALENDAR_SWAP':
      return {
        ...state,
        swap: false,
      }
    case 'DEACTIVATE_MASTERS_CALENDAR_SWAP_CLASS':
      return {
        ...state,
        swapSideClass: '',
      }
    case 'SWAP_MASTERS_CALENDAR_CHOSEN_DURATION':
      return {
        ...state,
        chosenDuration: action.payload
      }
    default:
      return state
  }
}
