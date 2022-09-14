export function SwapMonthToNext() {
  return { type: 'NEXT_MASTERS_CALENDAR_MONTH' }
}
export function SwapMonthToPrev() {
  return { type: 'PREV_MASTERS_CALENDAR_MONTH' }
}
export function SetCheckedDate(date) {
  return { type: 'SET_MASTERS_CALENDAR_ACTIVE_DATE', payload: { date: date } }
}
export function DeactivateSwap() {
  return { type: 'DEACTIVATE_MASTERS_CALENDAR_SWAP' }
}
export function DeactivateSwapClass() {
  return { type: 'DEACTIVATE_MASTERS_CALENDAR_SWAP_CLASS' }
}
export function SetHoverDate(date) {
  return { type: 'SET_MASTERS_CALENDAR_HOVER_DATE', payload: {date: date}}
}
export function SwapChosenDuration(duration) {
  return { type: 'SWAP_MASTERS_CALENDAR_CHOSEN_DURATION', payload: duration}
}

