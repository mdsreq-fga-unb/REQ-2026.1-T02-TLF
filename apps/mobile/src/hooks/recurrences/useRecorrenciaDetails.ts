import { useCallback, useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import type { Recurrence } from '@/components/finance/recurrences/types'
import type { PaymentHistoryEntry } from '@/utils/fixtures/recurrences'
import { categoryQueries } from '@/services/database/repository/category'
import { institutionQueries } from '@/services/database/queries/institution'
import { recurrenceQueries } from '@/services/database/repository/recurrece'
import { subCategoryQueries } from '@/services/database/repository/subCategory'
import { syncDatabase } from '@/services/database/sync'
import { useRecurrencesStore } from '@/stores/recurrences'
import { getApiErrorMessage } from '@/utils/apiErrorMessage'
import { getNextBillingLabel } from '@/utils/recurrences/dates'
import {
  buildCategoryLookup,
  buildInstitutionLookup,
  buildSubcategoryLookup,
  mapLocalRecurrenceToUi,
} from '@/utils/recurrences/recurrenceMappers'
import type { IconKey } from '@/utils/icons'

export function useRecorrenciaDetails() {
  const params = useLocalSearchParams<{ id: string }>()
  const id = params.id ?? ''

  const setPendingDeleteId = useRecurrencesStore((state) => state.setPendingDeleteId)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [recurrence, setRecurrence] = useState<Recurrence | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadRecurrence = useCallback(async () => {
    if (!id) return
    try {
      setError(null)
      const [categories, institutions, subcategories, recurrenceRecord] = await Promise.all([
        categoryQueries.getAll(),
        institutionQueries.getAll(),
        subCategoryQueries.getAll(),
        recurrenceQueries.getById(id),
      ])
      setRecurrence(
        mapLocalRecurrenceToUi(
          recurrenceRecord,
          buildCategoryLookup(
            categories.map((item) => ({
              id: item.id,
              name: item.name,
              icon: item.icon,
              color: item.color,
            })),
          ),
          buildInstitutionLookup(institutions.map((item) => ({ id: item.id, name: item.name }))),
          buildSubcategoryLookup(subcategories.map((item) => ({ id: item.id, name: item.name }))),
        ),
      )

      void (async () => {
        try {
          await syncDatabase()
        } catch (syncError) {
          console.warn(
            '[OFFLINE-FIRST] Sincronização de detalhes da recorrência indisponível.',
            syncError,
          )
        }
      })()
    } catch (loadError) {
      console.error('[Recurrences] Falha ao carregar detalhes', loadError)
      setError(getApiErrorMessage(loadError, 'Não foi possível carregar a recorrência.'))
    } finally {
      setIsLoading(false)
    }
  }, [id])

  useEffect(() => {
    void loadRecurrence()
  }, [loadRecurrence])

  const description = recurrence?.description ?? ''
  const amount = recurrence?.amount ?? 0
  const dueDay = recurrence?.dueDay ?? 1
  const isActive = recurrence?.isActive ?? false
  const isExpense = (recurrence?.type ?? 'EXPENSE') === 'EXPENSE'
  const accountName = recurrence?.institutionName ?? ''
  const categoryName = recurrence?.categoryName ?? ''
  const frequencyLabel = 'Mensal'
  const typeLabel = `${categoryName} ${frequencyLabel}`.trim()

  const icon: IconKey = recurrence?.categoryIcon ?? 'tag'
  const iconColor = recurrence?.categoryColor ?? '#4A5060'

  const history: PaymentHistoryEntry[] = []
  const annualProjection = amount * 12
  const nextBillingLabel = getNextBillingLabel(dueDay)

  const [intPart, decPart] = amount.toFixed(2).split('.')
  const intFormatted = parseInt(intPart).toLocaleString('pt-BR')

  const recurrenceForModal: Recurrence | null = recurrence

  const handleEdit = () => {
    if (!recurrence) return
    router.push({
      pathname: '/recorrencia/nova',
      params: {
        id: recurrence.id,
        description: recurrence.description,
        amount: recurrence.amount.toString(),
        frequency: recurrence.frequency,
        dueDay: recurrence.dueDay.toString(),
        institutionId: recurrence.institutionId,
        categoryId: recurrence.categoryId,
        subcategoryId: recurrence.subcategoryId ?? '',
        startDate: recurrence.startDate,
        endDate: recurrence.endDate ?? '',
        isActive: recurrence.isActive ? '1' : '0',
      },
    })
  }

  const handleDeleteConfirm = async (_scope: any) => {
    if (!id) return
    try {
      await recurrenceQueries.delete(id)
      void syncDatabase()
      setPendingDeleteId(id)
      setShowDeleteModal(false)
      router.back()
    } catch (deleteError) {
      console.error('[Recurrences] Falha ao excluir', deleteError)
      setError(getApiErrorMessage(deleteError, 'Não foi possível excluir a recorrência.'))
      setShowDeleteModal(false)
    }
  }

  const dismissError = () => setError(null)

  return {
    id,
    isLoading,
    error,
    dismissError,
    description,
    amount,
    dueDay,
    isActive,
    isExpense,
    accountName,
    frequencyLabel,
    typeLabel,
    icon,
    iconColor,
    history,
    annualProjection,
    nextBillingLabel,
    intFormatted,
    decPart,
    recurrenceForModal,
    showDeleteModal,
    setShowDeleteModal,
    handleEdit,
    handleDeleteConfirm,
  }
}
