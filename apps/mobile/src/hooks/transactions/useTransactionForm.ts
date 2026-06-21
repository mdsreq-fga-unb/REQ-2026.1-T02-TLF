import { useCallback, useState } from 'react'
import { createTransaction } from '@/services/database/repository/transaction'
import { TransactionType } from '@/services/database/models/transaction'
import { ACCOUNTS, MAX_AMOUNT_CENTS, TRANSACTION_FORM_ERRORS } from '@/utils/transactionForm'

export type TransactionInitialValues = {
  id?: string
  type?: TransactionType
  amountCents?: number
  accountId?: string
  destinationAccountId?: string
  categoryId?: string
  subcategoryId?: string
  notes?: string
  date?: string
}

export function useTransactionForm(initialValues?: TransactionInitialValues) {
  const [type, setType] = useState<TransactionType>(initialValues?.type ?? 'EXPENSE')
  const [amountCents, setAmountCents] = useState(initialValues?.amountCents ?? 0)
  const [accountId, setAccountId] = useState(initialValues?.accountId || '')
  const [destinationAccountId, setDestinationAccountId] = useState(
    initialValues?.destinationAccountId || '',
  )
  const [categoryId, setCategoryId] = useState<string | undefined>(initialValues?.categoryId)
  const [subcategoryId, setSubcategoryId] = useState(initialValues?.subcategoryId ?? '')
  const [date, setDate] = useState<Date>(() =>
    initialValues?.date ? new Date(initialValues.date) : new Date(),
  )
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
    account: accountId === '' ? 'Selecione uma conta' : undefined,
    category:
      type !== 'TRANSFER' && categoryId === '' ? TRANSACTION_FORM_ERRORS.category : undefined,
    destinationAccount:
      type === 'TRANSFER' && (destinationAccountId === '' || destinationAccountId === accountId)
        ? TRANSACTION_FORM_ERRORS.destinationAccount
        : undefined,
  }

  const isValid = !errors.amount && !errors.account && !errors.category && !errors.destinationAccount

  const reset = () => {
    setAmountCents(0)
    setAccountId('')
    setDestinationAccountId('')
    setCategoryId('')
    setSubcategoryId('')
    setDate(new Date())
    setNotes('')
    setSubmitAttempted(false)
    setSubmitError(null)
  }

  const submit = async (onSuccess?: () => void) => {
    setSubmitAttempted(true)
    if (!isValid || submitting) return
    if (type === 'TRANSFER' && destinationAccountId === accountId) {
      setSubmitError('Invalid transfer')
      return
    }
    setSubmitError(null)
    setSubmitting(true)

    const finalCategoryId = type === 'TRANSFER' ? (categoryId || CATEGORIES.TRANSFER[0].id) : categoryId

    if (!finalCategoryId) {
      setSubmitError('Category is required')
      setSubmitting(false)
      return
    }

    try {
      if (initialValues?.id) {
        // UPDATE MODE
        try {
          await transactionQueries.update(initialValues.id, {
            amount: amountCents,
            description: notes.trim() || finalCategoryId || type,
            type: type as any,
            accountId,
            categoryId: finalCategoryId,
            subcategoryId: subcategoryId || undefined,
            destinationAccountId: type === 'TRANSFER' ? destinationAccountId : undefined,
          })
        } catch {
          console.warn(
            '[OFFLINE-FIRST] Registro não encontrado localmente. O update será sincronizado apenas na API.',
          )
        }

        await transactionsService.update(initialValues.id, {
          amount: amountCents,
          description: notes.trim() || finalCategoryId || type,
          type,
          categoryId: finalCategoryId,
          accountId,
          subCategoryId: subcategoryId || undefined,
          destinationAccountId: type === 'TRANSFER' ? destinationAccountId : undefined,
        })
      } else {
        // CREATE MODE
        await transactionQueries.create({
          amount: amountCents,
          description: notes.trim() || finalCategoryId || type,
          date: date,
          type: type as any,
          status: 'PENDING',
          accountId,
          categoryId: finalCategoryId,
          subcategoryId: subcategoryId || undefined,
          destinationAccountId: type === 'TRANSFER' ? destinationAccountId : undefined,
        })

        await transactionsService.create({
          amount: amountCents,
          description: notes.trim() || finalCategoryId || type,
          date: date.toISOString(),
          type,
          status: 'COMPLETED',
          accountId,
          categoryId: finalCategoryId,
          subCategoryId: subcategoryId || undefined,
          destinationAccountId: type === 'TRANSFER' ? destinationAccountId : undefined,
        })
      }
      reset()
      onSuccess?.()
    } catch (error) {
      console.error('[TRANSACTION SUBMIT ERROR]', error)
      const axiosError = error as any
      if (axiosError?.response?.data) {
        console.log('[TRANSACTION SUBMIT ERROR DETAILS]', JSON.stringify(axiosError.response.data, null, 2))
      }
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
    date,
    setDate,
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
