import { useCallback, useEffect, useState } from 'react'
import {
  createTransaction,
  updateTransaction,
  type TransactionStatus,
  type TransactionType,
} from '@/services/database/queries/transaction'
import { MAX_AMOUNT_CENTS, TRANSACTION_FORM_ERRORS } from '@/utils/transactionForm'
import type { FormAccount } from '@/utils/transactionForm/data'

export type TransactionInitialValues = {
  id?: string
  type?: TransactionType
  amountCents?: number
  accountId?: string
  destinationAccountId?: string
  categoryId?: string
  subcategoryId?: string
  notes?: string
  date?: Date
  status?: TransactionStatus
}

export function useTransactionForm(
  initialValues?: TransactionInitialValues,
  accounts: FormAccount[] = [],
) {
  const [type, setType] = useState<TransactionType>(initialValues?.type ?? 'EXPENSE')
  const [amountCents, setAmountCents] = useState(initialValues?.amountCents ?? 0)
  const [accountId, setAccountId] = useState(initialValues?.accountId ?? '')
  const [destinationAccountId, setDestinationAccountId] = useState(
    initialValues?.destinationAccountId ?? '',
  )
  const [categoryId, setCategoryId] = useState(initialValues?.categoryId ?? '')
  const [subcategoryId, setSubcategoryId] = useState(initialValues?.subcategoryId ?? '')
  const [date] = useState(initialValues?.date ?? new Date())
  const [status] = useState<TransactionStatus>(initialValues?.status ?? 'CONFIRMED')
  const [notes, setNotes] = useState(initialValues?.notes ?? '')
  const [submitting, setSubmitting] = useState(false)
  const [showKeypad, setShowKeypad] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitAttempted, setSubmitAttempted] = useState(false)
  const editingId = initialValues?.id

  useEffect(() => {
    if (accounts.length === 0) return
    setAccountId((current) => current || accounts[0].id)
    setDestinationAccountId((current) => current || accounts[1]?.id || accounts[0].id)
  }, [accounts])

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
    account: accountId === '' ? TRANSACTION_FORM_ERRORS.account : undefined,
    category:
      type !== 'TRANSFER' && categoryId === '' ? TRANSACTION_FORM_ERRORS.category : undefined,
    destinationAccount:
      type === 'TRANSFER' && destinationAccountId === accountId
        ? TRANSACTION_FORM_ERRORS.destinationAccount
        : undefined,
  }

  const isValid =
    !errors.amount && !errors.account && !errors.category && !errors.destinationAccount

  const reset = () => {
    setAmountCents(0)
    setAccountId(accounts[0]?.id ?? '')
    setDestinationAccountId(accounts[1]?.id ?? accounts[0]?.id ?? '')
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
      const payload = {
        amount,
        description: notes.trim() || type,
        date,
        type,
        status,
        accountId,
        // TODO (categorias): por enquanto enviamos null. As categorias ainda não
        // são sincronizadas do backend; quando o sync de categorias existir,
        // colocar aqui o id real da categoria escolhida (form.categoryId).
        categoryId: null,
        subcategoryId: null,
        destinationAccountId: type === 'TRANSFER' ? destinationAccountId : null,
      }

      if (editingId) {
        await updateTransaction(editingId, payload)
      } else {
        await createTransaction(payload)
        reset()
      }
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
    date,
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
