import { useCallback, useState } from 'react'
import { listTransactions, createTransaction } from '@/services/api/transactions/transactions.api'
import type { TransactionType } from '@/services/api/transactions/transactions.types'
import { ACCOUNTS, MAX_AMOUNT_CENTS, TRANSACTION_FORM_ERRORS } from '@/utils/transactionForm'

export type TransactionInitialValues = {
  type?: TransactionType
  amountCents?: number
  accountId?: string
  categoryId?: string
  subcategoryId?: string
  notes?: string
}

export function useTransactionForm(initialValues?: TransactionInitialValues) {
  const [type, setType] = useState<TransactionType>(initialValues?.type ?? 'EXPENSE')
  const [amountCents, setAmountCents] = useState(initialValues?.amountCents ?? 0)
  const [accountId, setAccountId] = useState(initialValues?.accountId ?? ACCOUNTS[0].id)
  const [destinationAccountId, setDestinationAccountId] = useState(ACCOUNTS[1].id)
  const [categoryId, setCategoryId] = useState(initialValues?.categoryId ?? '')
  const [subcategoryId, setSubcategoryId] = useState(initialValues?.subcategoryId ?? '')
  const [date] = useState(() => Date.now())
  const [notes, setNotes] = useState(initialValues?.notes ?? '')
  const [submitting, setSubmitting] = useState(false)
  const [showKeypad, setShowKeypad] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitAttempted, setSubmitAttempted] = useState(false)

  const handleKeypad = useCallback((key: string) => {
    setAmountCents((prev) => {
      if (key === 'del') return Math.floor(prev / 10)
      const digit = parseInt(key, 10)
      if (isNaN(digit)) return prev
      const next = prev * 10 + digit
      return next > MAX_AMOUNT_CENTS ? prev : next
    })
  }, [])

  const handleTypeChange = (newType: TransactionType) => {
    setType(newType)
    setCategoryId('')
    setSubcategoryId('')
  }

  const amount = amountCents / 100

  const errors = {
    amount: amountCents === 0 ? TRANSACTION_FORM_ERRORS.amount : undefined,
    category:
      type !== 'TRANSFER' && categoryId === '' ? TRANSACTION_FORM_ERRORS.category : undefined,
    destinationAccount:
      type === 'TRANSFER' && destinationAccountId === accountId
        ? TRANSACTION_FORM_ERRORS.destinationAccount
        : undefined,
  }

  const isValid = !errors.amount && !errors.category && !errors.destinationAccount

  const reset = () => {
    setAmountCents(0)
    setAccountId(ACCOUNTS[0].id)
    setDestinationAccountId(ACCOUNTS[1].id)
    setCategoryId('')
    setSubcategoryId('')
    setNotes('')
    setSubmitAttempted(false)
    setSubmitError(null)
  }

  const submit = async (onSuccess?: () => void) => {
    setSubmitAttempted(true)
    if (!isValid || submitting) return
    setSubmitError(null)
    setSubmitting(true)
    try {
      await createTransaction({
        amount: amountCents,
        description: notes.trim() || categoryId || type,
        date: new Date().toISOString(),
        type,
        status: 'CONFIRMED',
        accountId,
        categoryId,
        subCategoryId: subcategoryId || undefined,
        destinationAccountId: type === 'TRANSFER' ? destinationAccountId : undefined,
      })
      reset()
      onSuccess?.()
    } catch (error) {
      const message = error instanceof Error ? error.message : TRANSACTION_FORM_ERRORS.submit
      setSubmitError(message)
    } finally {
      setSubmitting(false)
    }
  }

  return {
    type,
    handleTypeChange,
    amountCents,
    amount,
    accountId,
    setAccountId,
    destinationAccountId,
    setDestinationAccountId,
    categoryId,
    setCategoryId,
    subcategoryId,
    setSubcategoryId,
    notes,
    setNotes,
    handleKeypad,
    showKeypad,
    setShowKeypad,
    errors,
    submitAttempted,
    submitError,
    isValid,
    submitting,
    submit,
  }
}
