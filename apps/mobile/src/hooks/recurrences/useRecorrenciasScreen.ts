import { useCallback, useMemo, useState } from 'react'
import { useFocusEffect } from 'expo-router'
import type { Recurrence } from '@/components/finance/recurrences/types'
import { getCategories } from '@/services/api/category'
import {
  confirmRecurrence,
  listRecurrences,
  unconfirmRecurrence,
  updateRecurrence,
} from '@/services/api/recurrences'
import { syncDatabase } from '@/services/database/sync'
import { useRecurrencesStore } from '@/stores/recurrences'
import { getApiErrorMessage } from '@/utils/apiErrorMessage'
import { buildCategoryLookup, mapApiRecurrenceToUi } from '@/utils/recurrences/recurrenceMappers'

export function useRecorrenciasScreen() {
  const [recurrences, setRecurrences] = useState<Recurrence[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  // Confirmações/pulos do mês vêm do store (sobrevivem à navegação; reset por mês).
  const confirmedIds = useRecurrencesStore((state) => state.confirmedIds)
  const skippedIds = useRecurrencesStore((state) => state.skippedIds)
  const resetForMonth = useRecurrencesStore((state) => state.resetForMonth)
  const markConfirmed = useRecurrencesStore((state) => state.markConfirmed)
  const markSkipped = useRecurrencesStore((state) => state.markSkipped)
  const unmark = useRecurrencesStore((state) => state.unmark)
  const consumePendingDeleteId = useRecurrencesStore((state) => state.consumePendingDeleteId)

  const loadRecurrences = useCallback(async () => {
    try {
      setError(null)
      const [categories, response] = await Promise.all([
        getCategories().catch(() => []),
        listRecurrences(),
      ])
      const lookup = buildCategoryLookup(categories)
      setRecurrences(response.data.map((item) => mapApiRecurrenceToUi(item, lookup)))
    } catch (loadError) {
      console.error('[Recurrences] Falha ao carregar recorrências', loadError)
      const message = getApiErrorMessage(loadError, 'Não foi possível carregar as recorrências.')
      setError(message)
      setToast(message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useFocusEffect(
    useCallback(() => {
      const now = new Date()
      resetForMonth(`${now.getFullYear()}-${now.getMonth()}`)
      const deletedId = consumePendingDeleteId()
      if (deletedId) setToast('Recorrência excluída com sucesso.')
      void loadRecurrences()
    }, [consumePendingDeleteId, loadRecurrences, resetForMonth]),
  )

  const totalMonthly = useMemo(
    () =>
      recurrences
        .filter((r) => r.isActive && r.frequency === 'MONTHLY')
        .reduce((sum, r) => (r.type === 'EXPENSE' ? sum + r.amount : sum - r.amount), 0),
    [recurrences],
  )

  const activeCount = useMemo(() => recurrences.filter((r) => r.isActive).length, [recurrences])

  const handleToggleActive = async (id: string, isActive: boolean) => {
    const previous = recurrences
    setRecurrences((prev) => prev.map((r) => (r.id === id ? { ...r, isActive } : r)))
    try {
      await updateRecurrence(id, { isActive })
    } catch (toggleError) {
      console.error('[Recurrences] Falha ao atualizar status', toggleError)
      setRecurrences(previous)
      setToast(getApiErrorMessage(toggleError, 'Não foi possível atualizar a recorrência.'))
    }
  }

  const handleConfirmRecurrence = async (id: string) => {
    if (!recurrences.some((r) => r.id === id)) return

    // Atualização otimista da UI; revertida em caso de falha.
    markConfirmed(id)

    try {
      // O backend faz "complete-or-create": conclui a transação pendente do mês
      // (gerada pelo job mensal) ou cria uma nova, sem duplicar.
      await confirmRecurrence(id)

      // Sincroniza para refletir a transação no banco local (aba Registros).
      try {
        await syncDatabase()
      } catch (syncError) {
        console.warn('[OFFLINE-FIRST] Sync falhou após confirmar recorrência.', syncError)
      }

      setToast('Transação registrada com sucesso.')
    } catch (confirmError) {
      console.error('[Recurrences] Falha ao registrar transação da recorrência', confirmError)
      unmark(id)
      setToast(getApiErrorMessage(confirmError, 'Não foi possível registrar a transação.'))
    }
  }

  const handleSkipRecurrence = (id: string) => {
    markSkipped(id)
  }

  const handleUndoRecurrence = async (id: string) => {
    const wasConfirmed = confirmedIds.includes(id)

    // Otimista: limpa o estado da UI.
    unmark(id)

    // "Pular" é só estado de UI; só o confirmado tem efeito no backend.
    if (!wasConfirmed) return

    try {
      // Remove a transação lançada pela confirmação.
      await unconfirmRecurrence(id)

      try {
        await syncDatabase()
      } catch (syncError) {
        console.warn('[OFFLINE-FIRST] Sync falhou após desfazer confirmação.', syncError)
      }
    } catch (undoError) {
      console.error('[Recurrences] Falha ao desfazer confirmação', undoError)
      markConfirmed(id)
      setToast(getApiErrorMessage(undoError, 'Não foi possível desfazer a confirmação.'))
    }
  }

  return {
    recurrences,
    isLoading,
    error,
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
