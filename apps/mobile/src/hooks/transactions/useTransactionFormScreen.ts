import { router } from 'expo-router'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { CATEGORIES, TRANSACTION_FORM_COPY } from '@/utils/transactionForm'
import { useAccounts } from '@/hooks/accounts/useAccounts'
import { trySync } from '@/services/sync'
import {
  useTransactionForm,
  type TransactionInitialValues,
} from '@/hooks/transactions/useTransactionForm'

export type TransactionFormMode = 'create' | 'edit'

type Options = {
  initialValues?: TransactionInitialValues
  onSuccess?: () => void
  mode?: TransactionFormMode
  title?: string
}

export function useTransactionFormScreen({
  initialValues,
  onSuccess,
  mode = 'create',
  title,
}: Options = {}) {
  const { accounts } = useAccounts()
  const form = useTransactionForm(initialValues, accounts)
  const [showAccountPicker, setShowAccountPicker] = useState(false)
  const [showDestinationPicker, setShowDestinationPicker] = useState(false)
  const [showCategoryPicker, setShowCategoryPicker] = useState(false)
  const [successAlertVisible, setSuccessAlertVisible] = useState(false)

  useEffect(() => {
    void trySync()
  }, [])

  const resolvedTitle =
    title ?? (mode === 'edit' ? TRANSACTION_FORM_COPY.editTitle : TRANSACTION_FORM_COPY.createTitle)

  const submitLabel = form.submitting
    ? TRANSACTION_FORM_COPY.submitting
    : mode === 'edit'
      ? TRANSACTION_FORM_COPY.editSubmit
      : TRANSACTION_FORM_COPY.createSubmit

  const successTitle =
    mode === 'edit' ? TRANSACTION_FORM_COPY.editSuccessTitle : TRANSACTION_FORM_COPY.successTitle

  const successMessage =
    mode === 'edit'
      ? TRANSACTION_FORM_COPY.editSuccessMessage
      : TRANSACTION_FORM_COPY.successMessage

  // TODO (categorias): CATEGORIES é mock local. Trocar por uma lista vinda do banco
  // (ex.: useCategories observando uma tabela sincronizada) quando disponível.
  const categories = CATEGORIES[form.type]
  const selectedAccount = accounts.find((account) => account.id === form.accountId)
  const selectedDestination = accounts.find((account) => account.id === form.destinationAccountId)
  const selectedCategory = categories.find((category) => category.id === form.categoryId)
  const destinationOptions = useMemo(
    () => accounts.filter((account) => account.id !== form.accountId),
    [accounts, form.accountId],
  )

  const dismissSuccessAlert = useCallback(() => {
    setSuccessAlertVisible(false)
    onSuccess?.()
  }, [onSuccess])

  const handleSubmit = useCallback(() => {
    form.submit(() => {
      setSuccessAlertVisible(true)
      void trySync()
    })
  }, [form])

  const openRecorrencias = useCallback(() => {
    router.push('/recorrencia')
  }, [])

  return {
    form,
    mode,
    title: resolvedTitle,
    submitLabel,
    successTitle,
    successMessage,
    accounts,
    categories,
    selectedAccount,
    selectedDestination,
    selectedCategory,
    destinationOptions,
    showAccountPicker,
    setShowAccountPicker,
    showDestinationPicker,
    setShowDestinationPicker,
    showCategoryPicker,
    setShowCategoryPicker,
    successAlertVisible,
    dismissSuccessAlert,
    handleSubmit,
    openRecorrencias,
  }
}

export type { TransactionInitialValues }
