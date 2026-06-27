import { useCallback, useState } from 'react'
import { TransactionType } from '@/services/database/models/transaction'
import { syncDatabase } from '@/services/database/sync'
import { transactionQueries } from '@/services/database/repository/transaction'
import { MAX_AMOUNT_CENTS, TRANSACTION_FORM_ERRORS } from '@/utils/transactionForm'

export type TransactionInitialValues = {
  id?: string
  type?: TransactionType
  amountCents?: number
  institutionId?: string
  destinationInstitutionId?: string
  categoryId?: string
  subcategoryId?: string
  notes?: string
  date?: string
}

type SubmitOptions = { transferCategoryId?: string; categoryLabel?: string }

export function useTransactionForm(initialValues?: TransactionInitialValues) {
  const [type, setType] = useState<TransactionType>(initialValues?.type ?? 'EXPENSE')
  const [amountCents, setAmountCents] = useState(initialValues?.amountCents ?? 0)
  const [institutionId, setInstitutionId] = useState(initialValues?.institutionId || '')
  const [destinationInstitutionId, setDestinationInstitutionId] = useState(
    initialValues?.destinationInstitutionId || '',
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
    institution: institutionId === '' ? 'Selecione uma instituição' : undefined,
    category:
      type !== 'TRANSFER' && categoryId === '' ? TRANSACTION_FORM_ERRORS.category : undefined,
    destinationInstitution:
      type === 'TRANSFER' &&
      (destinationInstitutionId === '' || destinationInstitutionId === institutionId)
        ? TRANSACTION_FORM_ERRORS.destinationInstitution
        : undefined,
  }

  const isValid =
    !errors.amount && !errors.institution && !errors.category && !errors.destinationInstitution

  const reset = () => {
    setAmountCents(0)
    setInstitutionId('')
    setDestinationInstitutionId('')
    setCategoryId('')
    setSubcategoryId('')
    setDate(new Date())
    setNotes('')
    setSubmitAttempted(false)
    setSubmitError(null)
  }

  const submit = async (onSuccess?: () => void, options?: SubmitOptions) => {
    setSubmitAttempted(true)
    if (!isValid || submitting) return
    if (type === 'TRANSFER' && destinationInstitutionId === institutionId) {
      setSubmitError('Invalid transfer')
      return
    }
    setSubmitError(null)
    setSubmitting(true)

    const finalCategoryId =
      type === 'TRANSFER' ? categoryId || options?.transferCategoryId || '' : categoryId
    const finalCategoryLabel = options?.categoryLabel?.trim() || finalCategoryId

    if (!finalCategoryId) {
      setSubmitError('Category is required')
      setSubmitting(false)
      return
    }

    try {
      if (initialValues?.id) {
        try {
          await transactionQueries.update(initialValues.id, {
            amount: amountCents,
            description: notes.trim() || finalCategoryLabel || type,
            type: type,
            institutionId,
            categoryId: finalCategoryId,
            subcategoryId: subcategoryId || undefined,
            destinationInstitutionId:
              type === 'TRANSFER' ? destinationInstitutionId || undefined : undefined,
          })
        } catch {
          console.warn(
            '[OFFLINE-FIRST] Registro não encontrado localmente. A atualização será sincronizada pelo próximo ciclo.',
          )
        }
      } else {
        await transactionQueries.create({
          amount: amountCents,
          description: notes.trim() || finalCategoryLabel || type,
          date: date,
          type: type,
          status: 'PENDING',
          institutionId,
          categoryId: finalCategoryId,
          subcategoryId: subcategoryId || undefined,
          destinationInstitutionId:
            type === 'TRANSFER' ? destinationInstitutionId || undefined : undefined,
        })
      }

      try {
        await syncDatabase()
      } catch (syncError) {
        console.warn('[OFFLINE-FIRST] Sincronização falhou após salvar localmente.', syncError)
      }

      reset()
      onSuccess?.()
    } catch (error) {
      console.error('[TRANSACTION SUBMIT ERROR]', error)
      // if (axiosError?.response?.data) {
      //   console.log(
      //     '[TRANSACTION SUBMIT ERROR DETAILS]',
      //     JSON.stringify(axiosError.response.data, null, 2),
      //   )
      // }
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
    institutionId,
    setInstitutionId,
    destinationInstitutionId,
    setDestinationInstitutionId,
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
