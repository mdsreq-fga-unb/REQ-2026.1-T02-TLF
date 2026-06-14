export const subMonths = (date: Date, months: number) => {
  const newDate = new Date(date)
  newDate.setMonth(newDate.getMonth() - months)
  return newDate
}

export const addMonths = (date: Date, months: number) => {
  const newDate = new Date(date)
  newDate.setMonth(newDate.getMonth() + months)
  return newDate
}
