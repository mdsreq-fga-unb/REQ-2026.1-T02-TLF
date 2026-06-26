import { useCallback, useMemo, useState } from 'react'
import { useFocusEffect } from 'expo-router'
import type { Recurrence } from '@/components/finance/recurrences/types'
import { categoryQueries } from '@/services/database/repository/category'
import { institutionQueries } from '@/services/database/queries/institution'
import { recurrenceQueries } from '@/services/database/repository/recurrece'
import { subCategoryQueries } from '@/services/database/repository/subCategory'
import { transactionQueries } from '@/services/database/repository/transaction'
import { syncDatabase } from '@/services/database/sync'
import { useRecurrencesStore } from '@/stores/recurrences'
import { getApiErrorMessage } from '@/utils/apiErrorMessage'
import {
  buildCategoryLookup,
  buildInstitutionLookup,
  buildSubcategoryLookup,
  mapLocalRecurrenceToUi,
} from '@/utils/recurrences/recurrenceMappers'

export function useRecorrenciasScreen() {
  const [recurrences, setRecurrences] = useState<Recurrence[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)

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
      const [categories, institutions, subcategories, localRecurrences] = await Promise.all([
        categoryQueries.getAll(),
        institutionQueries.getAll(),
        subCategoryQueries.getAll(),
        recurrenceQueries.getAll(),
      ])

      const categoryLookup = buildCategoryLookup(
        categories.map((item) => ({
          id: item.id,
          name: item.name,
          icon: item.icon,
          color: item.color,
        })),
      )
      const institutionLookup = buildInstitutionLookup(
        institutions.map((item) => ({ id: item.id, name: item.name })),
      )
      const subcategoryLookup = buildSubcategoryLookup(
        subcategories.map((item) => ({ id: item.id, name: item.name })),
      )

      setRecurrences(
        localRecurrences.map((item) =>
          mapLocalRecurrenceToUi(item, categoryLookup, institutionLookup, subcategoryLookup),
        ),
      )

      void (async () => {
        try {
          await syncDatabase()
          const [freshCategories, freshInstitutions, freshSubcategories, freshRecurrences] =
            await Promise.all([
              categoryQueries.getAll(),
              institutionQueries.getAll(),
              subCategoryQueries.getAll(),
              recurrenceQueries.getAll(),
            ])
          const freshCategoryLookup = buildCategoryLookup(
            freshCategories.map((item) => ({
              id: item.id,
              name: item.name,
              icon: item.icon,
              color: item.color,
            })),
          )
          const freshInstitutionLookup = buildInstitutionLookup(
            freshInstitutions.map((item) => ({ id: item.id, name: item.name })),
          )
          const freshSubcategoryLookup = buildSubcategoryLookup(
            freshSubcategories.map((item) => ({ id: item.id, name: item.name })),
          )
          setRecurrences(
            freshRecurrences.map((item) =>
              mapLocalRecurrenceToUi(
                item,
                freshCategoryLookup,
                freshInstitutionLookup,
                freshSubcategoryLookup,
              ),
            ),
          )
        } catch (syncError) {
          console.warn('[OFFLINE-FIRST] Sincronização de recorrências indisponível.', syncError)
        }
      })()
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
      await recurrenceQueries.update(id, { isActive })
      void syncDatabase()
    } catch (toggleError) {
      console.error('[Recurrences] Falha ao atualizar status', toggleError)
      setRecurrences(previous)
      setToast(getApiErrorMessage(toggleError, 'Não foi possível atualizar a recorrência.'))
    }
  }

  const handleConfirmRecurrence = async (id: string) => {
    const recurrence = recurrences.find((item) => item.id === id)
    if (!recurrence) return

    markConfirmed(id)

    try {
      const existing = await transactionQueries.getByFilters({ recurrenceId: id })
      if (existing.length === 0) {
        await transactionQueries.create({
          amount: Math.round(recurrence.amount * 100),
          description: recurrence.description,
          date: new Date(),
          type: 'EXPENSE',
          status: 'PENDING',
          institutionId: recurrence.institutionId,
          categoryId: recurrence.categoryId || '',
          subcategoryId: recurrence.subcategoryId || undefined,
          recurrenceId: id,
        })
      }

      void syncDatabase()
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
    unmark(id)
    if (!wasConfirmed) return

    try {
      const linked = await transactionQueries.getByFilters({ recurrenceId: id })
      await Promise.all(linked.map((transaction) => transactionQueries.delete(transaction.id)))
      void syncDatabase()
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
