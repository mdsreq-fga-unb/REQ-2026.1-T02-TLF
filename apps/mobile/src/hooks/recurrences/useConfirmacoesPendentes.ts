import { useMemo, useRef, useState } from 'react'
import { Animated } from 'react-native'
import type { Recurrence } from '@/components/finance/recurrences/types'
import { MONTHS_FULL } from '@/utils/recurrences/dates'

export function useConfirmacoesPendentes(
  recurrences: Recurrence[],
  confirmedIds: string[],
  skippedIds: string[],
) {
  const [collapsed, setCollapsed] = useState(false)
  const rotation = useRef(new Animated.Value(0)).current

  const now = new Date()
  const currentDay = now.getDate()
  const currentMonth = MONTHS_FULL[now.getMonth()]

  const due = recurrences.filter(
    (recurrence) => recurrence.isActive && recurrence.dueDay <= currentDay,
  )
  const confirmedCount = due.filter((recurrence) => confirmedIds.includes(recurrence.id)).length
  const actedCount =
    confirmedCount +
    skippedIds.filter((id) => due.find((recurrence) => recurrence.id === id)).length
  const progress = due.length > 0 ? confirmedCount / due.length : 0
  const allDone = due.length > 0 && actedCount === due.length

  const toggleCollapse = () => {
    const toValue = collapsed ? 0 : 1
    Animated.timing(rotation, { toValue, duration: 200, useNativeDriver: true }).start()
    setCollapsed((prev) => !prev)
  }

  const chevronRotate = useMemo(
    () => rotation.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '-180deg'] }),
    [rotation],
  )

  return {
    collapsed,
    currentMonth,
    due,
    confirmedCount,
    progress,
    allDone,
    toggleCollapse,
    chevronRotate,
  }
}
