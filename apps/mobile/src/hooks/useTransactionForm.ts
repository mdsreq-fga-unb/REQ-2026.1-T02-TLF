import { useCallback, useState } from 'react'
import { createTransaction, type TransactionType } from '@/services/database/queries/transaction'
import { ACCOUNTS } from '@/components/finance/transactions/types'

const MAX_CENTS = 9_999_999

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
  const [date] = useState(new Date())
  const [notes, setNotes] = useState(initialValues?.notes ?? '')
  const [submitting, setSubmitting] = useState(false)
  const [showKeypad, setShowKeypad] = useState(false)

  const handleKeypad = useCallback((key: string) => {
    setAmountCents((prev) => {
      if (key === 'del') return Math.floor(prev / 10)
      const digit = parseInt(key, 10)
      if (isNaN(digit)) return prev
      const next = prev * 10 + digit
      return next > MAX_CENTS ? prev : next
    })
  }, [])

  const handleTypeChange = (newType: TransactionType) => {
    setType(newType)
    setCategoryId('')
    setSubcategoryId('')
  }

  const amount = amountCents / 100
  const isValid = amount > 0

  const reset = () => {
    setAmountCents(0)
    setAccountId(ACCOUNTS[0].id)
    setDestinationAccountId(ACCOUNTS[1].id)
    setCategoryId('')
    setSubcategoryId('')
    setNotes('')
  }

  const submit = async (onSuccess?: () => void) => {
    if (!isValid || submitting) return
    setSubmitting(true)
    try {
      await createTransaction({
        amount,
        description: notes.trim() || categoryId || type,
        date,
        type,
        status: 'CONFIRMED',
        accountId,
        categoryId: categoryId || 'uncategorized',
        subcategoryId: subcategoryId || null,
        destinationAccountId: type === 'TRANSFER' ? destinationAccountId : null,
      })
      reset()
      onSuccess?.()
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
    isValid,
    submitting,
    submit,
  }
}
