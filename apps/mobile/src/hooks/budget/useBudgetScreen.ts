import { useCallback, useMemo, useState } from 'react'
import { useFocusEffect } from 'expo-router'
import { BudgetService } from '@/services/api/budget'
import { getCategories, type CategoryDTO } from '@/services/api/category'
import { BudgetData, BudgetListItem, BudgetType } from 'types/types'
import { formatCurrency } from '@/utils/formatters'
import { getApiErrorMessage } from '@/utils/apiErrorMessage'

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
  const [month, setMonth] = useState(initialValues?.month ?? new Date().getMonth())
  const [year, setYear] = useState(initialValues?.year ?? new Date().getFullYear())
  const [submitting, setSubmitting] = useState(false)
  const [showKeypad, setShowKeypad] = useState(false)
  const [showCategoryPicker, setShowCategoryPicker] = useState(false)
  const [submitAttempted, setSubmitAttempted] = useState(false)
  const [budgets, setBudgets] = useState<BudgetListItem[]>([])
  const [refreshing, setRefreshing] = useState(false)
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null)
  const [categories, setCategories] = useState<CategoryDTO[]>([])

  const dismissFeedback = useCallback(() => setFeedbackMessage(null), [])

  const loadCategories = useCallback(async () => {
    try {
      const data = await getCategories()
      setCategories(data)
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Não foi possível carregar as categorias'
      setFeedbackMessage(errorMessage)
    }
  }, [])

  useFocusEffect(
    useCallback(() => {
      void loadCategories()
    }, [loadCategories]),
  )

  const categoryOptions = useMemo(
    () =>
      categories.map((item) => ({
        id: item.id,
        label: item.name,
        icon: item.icon,
        color: item.color,
      })),
    [categories],
  )

  const selectedCategoryLabel = useMemo(
    () => categoryOptions.find((item) => item.id === categoryId)?.label ?? '',
    [categoryOptions, categoryId],
  )

  async function fetchBudgets() {
    try {
      const response = await BudgetService.getAll()
      setBudgets(response.data)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred'
      setFeedbackMessage(errorMessage)
    }
  }

  async function onRefresh() {
    setRefreshing(true)
    await fetchBudgets()
    setRefreshing(false)
  }

  async function fetchBudget(id: string) {
    const response = await BudgetService.getById(id)
    const budget = response.data

    setName(budget.name)
    setAmountLimit(budget.amountLimit)
    setMonth(budget.month - 1)
    setYear(budget.year)
    setCategoryId(budget.categoryId)
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
    setFeedbackMessage(null)
  }

  const handleCreateSubmit = async (onSuccess?: () => void) => {
    setSubmitAttempted(true)
    if (!isValid || submitting) return
    setFeedbackMessage(null)
    setSubmitting(true)

    try {
      const payload: BudgetData = {
        name,
        amountLimit,
        month: month + 1,
        year,
        categoryId,
      }

      await BudgetService.create(payload)
      reset()
      onSuccess?.()
    } catch (error) {
      console.error('[BudgetCreateSubmit]', error)
      setFeedbackMessage(
        getApiErrorMessage(error, 'Não foi possível salvar a transação. Tente novamente.'),
      )
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
        name,
        amountLimit,
        month,
        year,
        categoryId,
      }

      await BudgetService.update(id, payload)
      onSuccess?.()
    } catch (error) {
      console.error('[BudgetEditSubmit]', error)
      setFeedbackMessage(
        getApiErrorMessage(error, 'Não foi possível salvar a transação. Tente novamente.'),
      )
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
    selectedCategoryLabel,
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
    dismissFeedback,
    categories,
    categoryOptions,
    loadCategories,
  }
}