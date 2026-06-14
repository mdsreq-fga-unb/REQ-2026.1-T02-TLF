import { router } from 'expo-router'
import { useCallback, useMemo, useState } from 'react'
import { ACCOUNTS, CATEGORIES, TRANSACTION_FORM_COPY } from '@/utils/transactionForm'
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
  const form = useTransactionForm(initialValues)
  const [showAccountPicker, setShowAccountPicker] = useState(false)
  const [showDestinationPicker, setShowDestinationPicker] = useState(false)
  const [showCategoryPicker, setShowCategoryPicker] = useState(false)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [successAlertVisible, setSuccessAlertVisible] = useState(false)

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

  const categories = CATEGORIES[form.type]
  const selectedAccount = ACCOUNTS.find((account) => account.id === form.accountId)
  const selectedDestination = ACCOUNTS.find((account) => account.id === form.destinationAccountId)
  const selectedCategory = categories.find((category) => category.id === form.categoryId)
  const destinationOptions = useMemo(
    () => ACCOUNTS.filter((account) => account.id !== form.accountId),
    [form.accountId],
  )

  const dismissSuccessAlert = useCallback(() => {
    setSuccessAlertVisible(false)
    onSuccess?.()
  }, [onSuccess])

  const handleSubmit = useCallback(() => {
    form.submit(() => {
      setSuccessAlertVisible(true)
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
    showDatePicker,
    setShowDatePicker,
    successAlertVisible,
    dismissSuccessAlert,
    handleSubmit,
    openRecorrencias,
  }
}

export type { TransactionInitialValues }
