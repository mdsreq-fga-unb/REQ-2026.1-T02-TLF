import { useCallback, useMemo, useState } from 'react'
import { useFocusEffect } from 'expo-router'
import { mockRecurrences } from '@/components/finance/recurrences/recurrences-data'
import { consumePendingDeleteId } from '@/components/finance/recurrences/recurrences-store'

export function useRecorrenciasScreen() {
  const [recurrences, setRecurrences] = useState(mockRecurrences)
  const [toast, setToast] = useState<string | null>(null)
  const [confirmedIds, setConfirmedIds] = useState<string[]>([])
  const [skippedIds, setSkippedIds] = useState<string[]>([])

  useFocusEffect(
    useCallback(() => {
      const id = consumePendingDeleteId()
      if (id) {
        setRecurrences((prev) => prev.filter((r) => r.id !== id))
        setToast('Recorrência excluída com sucesso.')
      }
    }, []),
  )

  const totalMonthly = useMemo(
    () =>
      recurrences
        .filter((r) => r.isActive && r.frequency === 'MONTHLY')
        .reduce((sum, r) => (r.type === 'EXPENSE' ? sum + r.amount : sum - r.amount), 0),
    [recurrences],
  )

  const activeCount = useMemo(() => recurrences.filter((r) => r.isActive).length, [recurrences])

  const handleToggleActive = (id: string, isActive: boolean) => {
    setRecurrences((prev) => prev.map((r) => (r.id === id ? { ...r, isActive } : r)))
  }

  const handleConfirmRecurrence = (id: string) => {
    setConfirmedIds((prev) => [...prev, id])
    setToast('Transação registrada com sucesso.')
  }

  const handleSkipRecurrence = (id: string) => {
    setSkippedIds((prev) => [...prev, id])
  }

  const handleUndoRecurrence = (id: string) => {
    setConfirmedIds((prev) => prev.filter((cid) => cid !== id))
    setSkippedIds((prev) => prev.filter((sid) => sid !== id))
  }

  return {
    recurrences,
    toast,
    setToast,
    confirmedIds,
    skippedIds,
    totalMonthly,
    activeCount,
    handleToggleActive,
    handleConfirmRecurrence,
    handleSkipRecurrence,
    handleUndoRecurrence,
  }
}
