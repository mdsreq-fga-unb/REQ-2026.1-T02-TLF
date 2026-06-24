import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router'
import type { RecurrenceFrequency, RecurrenceType } from '@/components/finance/recurrences/types'
import type { EditScope } from '@/hooks/recurrences/useEditScopeModal'
import { getCategories, type CategoryDTO } from '@/services/api/category'
import {
  createRecurrence,
  updateRecurrence,
  RecurrenceApplyScope,
  type RecurrenceUpdatePayload,
} from '@/services/api/recurrences'
import { institutionQueries } from '@/services/database/queries/institution'
import { subCategoryQueries } from '@/services/database/repository/subCategory'
import { syncDatabase } from '@/services/database/sync'
import { getApiErrorMessage } from '@/utils/apiErrorMessage'
import type { IconKey } from '@/utils/icons'

const MAX_CENTS = 9_999_999
const NO_SUBCATEGORY = ''

export const frequencyOptions = [
  { label: 'Diária', value: 'DAILY' },
  { label: 'Semanal', value: 'WEEKLY' },
  { label: 'Quinzenal', value: 'BIWEEKLY' },
  { label: 'Mensal', value: 'MONTHLY' },
  { label: 'Anual', value: 'YEARLY' },
]

export type InstitutionOption = { id: string; name: string }
export type CategoryOption = { id: string; name: string; icon: IconKey }
export type SubcategoryOption = { id: string; name: string }

export const parseISODate = (iso?: string): Date | null => {
  if (!iso) return null
  const [y, m, d] = iso.split('-').map(Number)
  if (!y || !m || !d) return null
  return new Date(y, m - 1, d)
}

export const formatDateDisplay = (date: Date | null): string => {
  if (!date) return ''
  const d = String(date.getDate()).padStart(2, '0')
  const m = String(date.getMonth() + 1).padStart(2, '0')
  return `${d}/${m}/${date.getFullYear()}`
}

type Errors = Partial<Record<string, string>>

export function useNovaRecorrencia() {
  const params = useLocalSearchParams<{
    id?: string
    description?: string
    amount?: string
    frequency?: RecurrenceFrequency
    dueDay?: string
    institutionId?: string
    categoryId?: string
    subcategoryId?: string
    startDate?: string
    endDate?: string
    isActive?: string
  }>()

  const isEditing = !!params.id

  // Valor inicial (centavos) vindo dos params — usado para detectar alteração na edição.
  const initialAmountCents = (() => {
    if (params.amount) {
      const parsed = parseFloat(params.amount.replace(',', '.'))
      return isNaN(parsed) ? 0 : Math.round(parsed * 100)
    }
    return 0
  })()

  // Recorrência é sempre despesa no backend (não há campo de tipo); mantido fixo.
  const type: RecurrenceType = 'EXPENSE'
  const [amountCents, setAmountCents] = useState<number>(initialAmountCents)
  const [keypadVisible, setKeypadVisible] = useState(false)
  const [description, setDescription] = useState(params.description ?? '')
  const [frequency, setFrequency] = useState<string>(params.frequency ?? 'MONTHLY')
  const [dueDay, setDueDay] = useState(params.dueDay ?? '1')
  const [institutionId, setInstitutionId] = useState(params.institutionId ?? '')
  const [categoryId, setCategoryId] = useState(params.categoryId ?? '')
  const [subcategoryId, setSubcategoryId] = useState<string>(params.subcategoryId ?? NO_SUBCATEGORY)
  const [startDate, setStartDate] = useState<Date | null>(() => parseISODate(params.startDate))
  const [endDate, setEndDate] = useState<Date | null>(() => parseISODate(params.endDate))
  const [isIndeterminate, setIsIndeterminate] = useState(!params.endDate)
  const [showStartPicker, setShowStartPicker] = useState(false)
  const [showEndPicker, setShowEndPicker] = useState(false)
  const [isActive, setIsActive] = useState(params.isActive !== '0')
  const [errors, setErrors] = useState<Errors>({})
  const [showSuccess, setShowSuccess] = useState(false)
  const [showEditScopeModal, setShowEditScopeModal] = useState(false)
  const [showFrequencyPicker, setShowFrequencyPicker] = useState(false)
  const [showDayPicker, setShowDayPicker] = useState(false)
  const [showAccountPicker, setShowAccountPicker] = useState(false)
  const [showCategoryPicker, setShowCategoryPicker] = useState(false)
  const [showSubcategoryPicker, setShowSubcategoryPicker] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null)

  const [institutions, setInstitutions] = useState<InstitutionOption[]>([])
  const [categories, setCategories] = useState<CategoryOption[]>([])
  const [subcategoriesByCategory, setSubcategoriesByCategory] = useState<
    Record<string, SubcategoryOption[]>
  >({})

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const loadOptions = useCallback(async () => {
    try {
      const [localInstitutions, apiCategories, localSubcategories] = await Promise.all([
        institutionQueries.getAll(),
        getCategories().catch((): CategoryDTO[] => []),
        subCategoryQueries.getAll(),
      ])

      const institutionOptions = localInstitutions.map((institution) => ({
        id: institution.id,
        name: institution.name,
      }))
      setInstitutions(institutionOptions)

      setCategories(
        apiCategories.map((category) => ({
          id: category.id,
          name: category.name,
          icon: (category.icon as IconKey) ?? 'tag',
        })),
      )

      const grouped: Record<string, SubcategoryOption[]> = {}
      for (const sub of localSubcategories) {
        const list = grouped[sub.categoryId] ?? (grouped[sub.categoryId] = [])
        list.push({ id: sub.id, name: sub.name })
      }
      setSubcategoriesByCategory(grouped)

      // Define padrões na criação quando ainda não houver seleção.
      setInstitutionId((prev) => prev || institutionOptions[0]?.id || '')
      setCategoryId((prev) => prev || apiCategories[0]?.id || '')
    } catch (loadError) {
      console.error('[Recurrences] Falha ao carregar opções do formulário', loadError)
    }
  }, [])

  useFocusEffect(
    useCallback(() => {
      void loadOptions()
    }, [loadOptions]),
  )

  const handleKeypad = (key: string) => {
    setAmountCents((prev) => {
      if (key === 'del') return Math.floor(prev / 10)
      const digit = parseInt(key, 10)
      if (isNaN(digit)) return prev
      const next = prev * 10 + digit
      return next > MAX_CENTS ? prev : next
    })
  }

  const validate = (): boolean => {
    const newErrors: Errors = {}
    if (amountCents <= 0) newErrors.amount = 'Informe um valor maior que zero'
    if (!description.trim()) newErrors.description = 'Campo obrigatório'
    if (!dueDay) newErrors.dueDay = 'Campo obrigatório'
    if (!institutionId) newErrors.institution = 'Selecione uma instituição'
    if (!categoryId) newErrors.category = 'Selecione uma categoria'
    if (!startDate) newErrors.startDate = 'Campo obrigatório'
    if (!isIndeterminate && !endDate) newErrors.endDate = 'Campo obrigatório'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateField = (field: string, value: string) => {
    setErrors((prev) => {
      const next = { ...prev }
      if (value.trim()) delete next[field]
      else next[field] = 'Campo obrigatório'
      return next
    })
  }

  const showSuccessAndGoBack = () => {
    setShowSuccess(true)
    const timeout = globalThis.setTimeout(() => {
      setShowSuccess(false)
      router.back()
    }, 1600)

    timeoutRef.current = timeout
    if (typeof (timeout as any)?.unref === 'function') {
      ;(timeout as any).unref()
    }
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const buildPayload = () => ({
    institutionId,
    categoryId,
    subCategoryId: subcategoryId || undefined,
    description: description.trim(),
    amount: amountCents,
    chargeDate: parseInt(dueDay, 10),
    startDate: (startDate as Date).toISOString(),
    endDate: !isIndeterminate && endDate ? endDate.toISOString() : undefined,
    isActive,
  })

  // Converte uma data em 'yyyy-mm-dd' (mesmo formato que vem nos params da edição).
  const toYmd = (date: Date | null): string | undefined =>
    date
      ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
          date.getDate(),
        ).padStart(2, '0')}`
      : undefined

  // Na edição enviamos só o que mudou (PATCH). Isso evita reenviar startDate/chargeDate
  // inalterados, que o backend interpretaria como mudança de período e bloquearia (400)
  // quando já existem transações geradas.
  const buildUpdatePayload = (): RecurrenceUpdatePayload => {
    const payload: RecurrenceUpdatePayload = {}
    const trimmedDescription = description.trim()

    if (trimmedDescription !== (params.description ?? '')) payload.description = trimmedDescription
    if (amountCents !== initialAmountCents) payload.amount = amountCents
    if (dueDay !== (params.dueDay ?? '')) payload.chargeDate = parseInt(dueDay, 10)
    if (institutionId !== (params.institutionId ?? '')) payload.institutionId = institutionId
    if (categoryId !== (params.categoryId ?? '')) payload.categoryId = categoryId
    if ((subcategoryId || '') !== (params.subcategoryId ?? '')) {
      payload.subCategoryId = subcategoryId || undefined
    }
    if (isActive !== (params.isActive !== '0')) payload.isActive = isActive

    if (toYmd(startDate) !== (params.startDate || undefined) && startDate) {
      payload.startDate = startDate.toISOString()
    }

    const currentEndYmd = isIndeterminate ? undefined : toYmd(endDate)
    if (currentEndYmd !== (params.endDate || undefined) && currentEndYmd && endDate) {
      payload.endDate = endDate.toISOString()
    }

    return payload
  }

  const persist = async (scope?: EditScope) => {
    if (submitting) return
    setFeedbackMessage(null)
    setSubmitting(true)
    try {
      if (isEditing && params.id) {
        const applyScope = scope === 'all' ? RecurrenceApplyScope.ALL : RecurrenceApplyScope.FUTURE
        await updateRecurrence(params.id, { ...buildUpdatePayload(), applyScope })
      } else {
        await createRecurrence(buildPayload())
      }

      // Reconcilia o banco local com o servidor (mesmo padrão de confirmar/desfazer).
      try {
        await syncDatabase()
      } catch (syncError) {
        console.warn('[OFFLINE-FIRST] Sync falhou após salvar recorrência.', syncError)
      }

      showSuccessAndGoBack()
    } catch (saveError) {
      console.error('[Recurrences] Falha ao salvar recorrência', saveError)
      setFeedbackMessage(
        getApiErrorMessage(saveError, 'Não foi possível salvar a recorrência. Tente novamente.'),
      )
    } finally {
      setSubmitting(false)
    }
  }

  const handleSave = () => {
    if (!validate()) return
    if (isEditing) {
      setShowEditScopeModal(true)
      return
    }
    return persist()
  }

  const handleScopeConfirm = (scope: EditScope) => {
    setShowEditScopeModal(false)
    return persist(scope)
  }

  const subcategoryOptions = useMemo(
    () => subcategoriesByCategory[categoryId] ?? [],
    [subcategoriesByCategory, categoryId],
  )

  const isFormValid =
    amountCents > 0 && !!description.trim() && startDate != null && !!institutionId && !!categoryId
  const selectedFrequencyLabel =
    frequencyOptions.find((f) => f.value === frequency)?.label ?? 'Mensal'
  const selectedInstitution = institutions.find((i) => i.id === institutionId)
  const selectedCategory = categories.find((c) => c.id === categoryId)
  const selectedSubcategory = subcategoryOptions.find((s) => s.id === subcategoryId)

  return {
    isEditing,
    submitting,
    feedbackMessage,
    setFeedbackMessage,
    type,
    amountCents,
    keypadVisible,
    setKeypadVisible,
    description,
    setDescription,
    frequency,
    setFrequency,
    dueDay,
    setDueDay,
    institutionId,
    setInstitutionId,
    categoryId,
    setCategoryId,
    subcategoryId,
    setSubcategoryId,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    isIndeterminate,
    setIsIndeterminate,
    showStartPicker,
    setShowStartPicker,
    showEndPicker,
    setShowEndPicker,
    isActive,
    setIsActive,
    errors,
    showSuccess,
    showEditScopeModal,
    setShowEditScopeModal,
    showFrequencyPicker,
    setShowFrequencyPicker,
    showDayPicker,
    setShowDayPicker,
    showAccountPicker,
    setShowAccountPicker,
    showCategoryPicker,
    setShowCategoryPicker,
    showSubcategoryPicker,
    setShowSubcategoryPicker,
    isFormValid,
    selectedFrequencyLabel,
    institutions,
    categories,
    selectedInstitution,
    selectedCategory,
    subcategoryOptions,
    selectedSubcategory,
    handleKeypad,
    handleSave,
    handleScopeConfirm,
    validateField,
    NO_SUBCATEGORY,
  }
}
