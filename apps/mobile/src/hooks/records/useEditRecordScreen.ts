import { router, useLocalSearchParams } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'
import type { TransactionInitialValues } from '@/hooks/transactions/useTransactionForm'
import { getTransactionById } from '@/services/database/queries/transaction'
import { TRANSACTION_FORM_COPY, parseRouteString } from '@/utils/transactionForm'

export function useEditRecordScreen() {
  const params = useLocalSearchParams()
  const id = parseRouteString(params.id)

  // Carrega o record inteiro do DB local
  const [initialValues, setInitialValues] = useState<TransactionInitialValues | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    let active = true

    if (!id) {
      setNotFound(true)
      setLoading(false)
      return
    }

    getTransactionById(id)
      .then((tx) => {
        if (!active) return
        setInitialValues({
          id: tx.id,
          type: tx.type,
          amountCents: Math.round(tx.amount * 100),
          accountId: tx.accountId,
          destinationAccountId: tx.destinationAccountId ?? undefined,
          categoryId: tx.categoryId ?? undefined,
          subcategoryId: tx.subcategoryId ?? undefined,
          notes: tx.description,
          date: tx.date,
          status: tx.status,
        })
        setLoading(false)
      })
      .catch(() => {
        if (!active) return
        setNotFound(true)
        setLoading(false)
      })

    return () => {
      active = false
    }
  }, [id])

  const handleBack = useCallback(() => {
    router.back()
  }, [])

  const handleSuccess = useCallback(() => {
    router.back()
  }, [])

  return {
    title: TRANSACTION_FORM_COPY.editTitle,
    mode: 'edit' as const,
    loading,
    notFound,
    initialValues,
    handleBack,
    handleSuccess,
  }
}
