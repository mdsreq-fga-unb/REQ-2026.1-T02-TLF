export const MONTHS_SHORT = [
  'Jan',
  'Fev',
  'Mar',
  'Abr',
  'Mai',
  'Jun',
  'Jul',
  'Ago',
  'Set',
  'Out',
  'Nov',
  'Dez',
] as const

export const MONTHS_FULL = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
] as const

export function getNextBillingLabel(dueDay: number, referenceDate = new Date()): string {
  let nextMonth = referenceDate.getMonth()
  if (referenceDate.getDate() > dueDay) {
    nextMonth = (nextMonth + 1) % 12
  }
  return `${dueDay} ${MONTHS_SHORT[nextMonth]}`
}
