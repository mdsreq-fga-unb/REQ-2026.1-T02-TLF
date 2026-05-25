import { useCallback, useState } from 'react'
import { createBudget } from '@/services/api/budget'
import { BudgetData, BudgetType } from 'types/types'
import { formatCurrency } from '@/utils/formatters'
import { Alert } from 'react-native'

const MAX_CENTS = 9_999_999

export type BudgetInitialValues = {
  name: string
  type?: BudgetType
  amountLimit?: number
  categoryId?: string
  month: number
  year: number
}

export function useBudgetForm(initialValues?: BudgetInitialValues) {
  const [name, setName] = useState(initialValues?.name ?? '')
  const [type, setType] = useState<BudgetType>(initialValues?.type ?? 'BUDGET')
  const [amountLimit, setAmountLimit] = useState(initialValues?.amountLimit ?? 0)
  const [categoryId, setCategoryId] = useState(initialValues?.categoryId ?? '')
  const [month, setMonth] = useState(new Date().getMonth())
  const [year, setYear] = useState(new Date().getFullYear())
  const [submitting, setSubmitting] = useState(false)
  const [showKeypad, setShowKeypad] = useState(false)
  const [showCategoryPicker, setShowCategoryPicker] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitAttempted, setSubmitAttempted] = useState(false)

  const handleKeypad = useCallback((key: string) => {
    setAmountLimit((prev) => {
      if (key === 'del') return Math.floor(prev / 10)
      const digit = parseInt(key, 10)
      if (isNaN(digit)) return prev
      const next = prev * 10 + digit
      return next > MAX_CENTS ? prev : next
    })
  }, [])

  const handleTypeChange = (newType: BudgetType) => {
    setType(newType)
    setCategoryId('')
  }

  const amount = formatCurrency(amountLimit / 100)

  const errors = {
    amount: amountLimit === 0 ? 'Informe o valor da transação' : undefined,
    category: categoryId === '' ? 'Selecione uma categoria' : undefined,
  }

  const isValid = !errors.amount && !errors.category

  const reset = () => {
    setName('orçamento')
    setAmountLimit(0)
    setCategoryId('')
    setMonth(new Date().getMonth())
    setYear(new Date().getFullYear())
    setSubmitAttempted(false)
    setSubmitError(null)
  }

  const handleSubmit = async (onSuccess?: () => void) => {
    setSubmitAttempted(true)
    if (!isValid || submitting) return
    setSubmitError(null)
    setSubmitting(true)
    try {
      const payload: BudgetData = {
        name: name,
        categoryId: categoryId,
        amountLimit: amountLimit,
        month: month,
        year: year,
      }

      await createBudget(payload)
      reset()
      Alert.alert('Registro salvo!', 'Sua transação foi registrada com sucesso.', [
        { text: 'OK', onPress: onSuccess },
      ])
      onSuccess?.()
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Não foi possível salvar a transação. Tente novamente.'
      setSubmitError(message)
    } finally {
      setSubmitting(false)
    }
  }

  return {
    name,
    setName,
    type,
    handleTypeChange,
    amount,
    amountLimit,
    setAmountLimit,
    categoryId,
    setCategoryId,
    month,
    setMonth,
    year,
    setYear,
    handleKeypad,
    showKeypad,
    setShowKeypad,
    showCategoryPicker,
    setShowCategoryPicker,
    errors,
    submitAttempted,
    submitError,
    isValid,
    submitting,
    handleSubmit,
  }
}
