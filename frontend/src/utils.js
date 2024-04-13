import dayjs from 'dayjs'

const DATE_FORMAT = 'DD/MM/YYYY'

export const getDueDate = (date) => date
  ? dayjs(date, DATE_FORMAT) : null

export const getDueDateFormatted = (date) => date
  ? dayjs(date).format(DATE_FORMAT) : undefined

export const isLate = (todo) => todo.due && !todo.done
  ? dayjs().isAfter(dayjs(todo.due, DATE_FORMAT)) : false

const diffFromToday = (date) => Math.abs(getDueDate(date).diff(dayjs(), 'days'))

export const dueStatus = (todo)  => {
  if (todo.done || !todo.due) return '\xa0'
  if (isLate(todo)) return `Overdue since ${diffFromToday(todo.due)} day(s)`
  return `Due in ${diffFromToday(todo.due)} day(s)`
}
