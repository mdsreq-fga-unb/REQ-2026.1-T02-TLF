// TODO: Remover quando sistema de categorias for implementado
/* eslint-disable no-console */
import { useCallback, useState } from 'react'
import { BudgetService } from '@/services/api/budget'
import { BudgetData, BudgetListItem, BudgetType } from 'types/types'
import { formatCurrency } from '@/utils/formatters'

const MAX_CENTS = 9_999_999

export type BudgetInitialValues = {
  name: string
  type?: BudgetType
  amountLimit?: number
  categoryId?: string
  month: number
  year: number
}

export function useBudgetScreen(initialValues?: BudgetInitialValues) {
  const [name, setName] = useState(initialValues?.name ?? '')
  const [type, setType] = useState<BudgetType>(initialValues?.type ?? 'BUDGET')
  const [amountLimit, setAmountLimit] = useState(initialValues?.amountLimit ?? 0)
  const [categoryId, setCategoryId] = useState(initialValues?.categoryId ?? '')
  const [month, setMonth] = useState(new Date().getMonth())
  const [year, setYear] = useState(new Date().getFullYear())
  const [submitting, setSubmitting] = useState(false)
  const [showKeypad, setShowKeypad] = useState(false)
  const [showCategoryPicker, setShowCategoryPicker] = useState(false)
  const [submitAttempted, setSubmitAttempted] = useState(false)
  const [budgets, setBudgets] = useState<BudgetListItem[]>([])
  const [refreshing, setRefreshing] = useState(false)
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null)

  const dismissFeedback = useCallback(() => setFeedbackMessage(null), [])

  async function fetchBudgets() {
      try {
        const response = await BudgetService.getAll()
  
        setBudgets(response.data)
      } catch (error) {
        const errorMessage = error instanceof Error 
          ? error.message 
          : 'An unexpected error occurred'
        setFeedbackMessage(errorMessage)
      }
    }

  async function onRefresh() {
    setRefreshing(true)

    await fetchBudgets()  

    setRefreshing(false)
  } 

  async function fetchBudget(id: string) {
  const response =
    await BudgetService.getById(id)

  const budget = response.data

  setName(budget.name)
  setAmountLimit(
    budget.amountLimit
  )
  setMonth(budget.month - 1)
  setYear(budget.year)
  setCategoryId(
    budget.categoryId,
  )
}

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
    // TODO: Reativar quando a logica de categorias for implementada
    // category: categoryId === '' ? 'Selecione uma categoria' : undefined,
  }
  
  // TODO: Reativar quando a logica de categorias for implementada
  // const isValid = !errors.amount && !errors.category
  const isValid = !errors.amount

  const reset = () => {
    setName('orçamento')
    setAmountLimit(0)
    setCategoryId('')
    setMonth(new Date().getMonth())
    setYear(new Date().getFullYear())
    setSubmitAttempted(false)
    setFeedbackMessage(null)
  }

  const handleCreateSubmit = async (onSuccess?: () => void) => {
    setSubmitAttempted(true)
    if (!isValid || submitting) return
    setFeedbackMessage(null)
    setSubmitting(true)
    try {
      const payload: BudgetData = {
        name: name,
        amountLimit: amountLimit,
        month: month + 1,
        year: year,
      }

      console.log('[BudgetCreateSubmit] payload:', payload)
      await BudgetService.create(payload)
      reset()
      onSuccess?.()
    } catch (error) {
      let message = 'Não foi possível salvar a transação. Tente novamente.'
      if (error instanceof Error) {
        message = error.message
      }
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as any
        console.error('[BudgetCreateSubmit] response data:', axiosError.response?.data)
        message = axiosError.response?.data?.message || message
      }
      setFeedbackMessage(message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleEditSubmit = async (id: string, onSuccess?: () => void) => {
    setSubmitAttempted(true)
    if (!isValid || submitting) return
    setFeedbackMessage(null)
    setSubmitting(true)
    try {
      const payload: BudgetData = {
        name: name,
        amountLimit: amountLimit,
        month: month,
        year: year,
      }

      console.log('[BudgetEditSubmit] payload:', payload)
      await BudgetService.update(id, payload)
      onSuccess?.()
    } catch (error) {
      let message = 'Não foi possível salvar a transação. Tente novamente.'
      if (error instanceof Error) {
        message = error.message
      }
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as any
        console.error('[BudgetEditSubmit] response data:', axiosError.response?.data)
        message = axiosError.response?.data?.message || message
      }
      setFeedbackMessage(message)
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
    isValid,
    submitting,
    handleCreateSubmit,
    handleEditSubmit,
    budgets,
    setBudgets,
    fetchBudgets,
    fetchBudget,
    refreshing,
    setRefreshing,
    onRefresh,
    feedbackMessage,
    setFeedbackMessage,
    dismissFeedback
  }
}
