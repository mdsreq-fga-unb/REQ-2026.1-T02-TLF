const pad = (value: number) => String(value).padStart(2, '0')

const formatTime = (date: Date) => `${pad(date.getHours())}:${pad(date.getMinutes())}`

const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate()

export function formatNotificationDate(date: Date): string {
  const now = new Date()
  const yesterday = new Date(now)
  yesterday.setDate(now.getDate() - 1)
  const time = formatTime(date)

  if (isSameDay(date, now)) return `Hoje, ${time}`
  if (isSameDay(date, yesterday)) return `Ontem, ${time}`

  return `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${String(date.getFullYear()).slice(-2)}, ${time}`
}
