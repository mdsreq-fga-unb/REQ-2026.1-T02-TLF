import { router, useLocalSearchParams } from 'expo-router'
import { useCallback, useMemo } from 'react'
import type { TransactionInitialValues } from '@/hooks/transactions/useTransactionForm'
import {
  TRANSACTION_FORM_COPY,
  parseAmountCents,
  parseRouteString,
  parseTransactionType,
} from '@/utils/transactionForm'

export function useEditRecordScreen() {
  const params = useLocalSearchParams()

  const initialValues = useMemo<TransactionInitialValues>(
    () => ({
      id: parseRouteString(params.id),
      type: parseTransactionType(params.type),
      amountCents: parseAmountCents(params.amount),
      categoryId: parseRouteString(params.categoryId),
      notes: parseRouteString(params.description),
    }),
    [params.id, params.amount, params.categoryId, params.description, params.type],
  )

  const handleBack = useCallback(() => {
    router.back()
  }, [])

  const handleSuccess = useCallback(() => {
    router.back()
  }, [])

  return {
    title: TRANSACTION_FORM_COPY.editTitle,
    mode: 'edit' as const,
    initialValues,
    handleBack,
    handleSuccess,
  }
}
