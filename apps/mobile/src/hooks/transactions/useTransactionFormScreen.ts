import { router, useFocusEffect } from 'expo-router'
import { useCallback, useMemo, useState } from 'react'
import { useInstitutionsStore } from '@/stores/institutions'
import { getCategories, type CategoryDTO } from '@/services/api/category'
import { institutionQueries } from '@/services/database/queries/institution'
import { mapLocalInstitutionToListItem } from '@/utils/institutions/institutionMappers'
import { TRANSACTION_FORM_COPY } from '@/utils/transactionForm'
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
  const institutions = useInstitutionsStore((state) => state.institutions)
  const setInstitutions = useInstitutionsStore((state) => state.setInstitutions)
  const [showInstitutionPicker, setShowInstitutionPicker] = useState(false)
  const [showDestinationPicker, setShowDestinationPicker] = useState(false)
  const [showCategoryPicker, setShowCategoryPicker] = useState(false)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [successAlertVisible, setSuccessAlertVisible] = useState(false)
  const [categories, setCategories] = useState<CategoryDTO[]>([])

  const loadCategories = useCallback(async () => {
    try {
      const data = await getCategories()
      setCategories(data)
    } catch (error) {
      console.error('[TransactionForm] Failed to load categories', error)
    }
  }, [])

  const loadInstitutions = useCallback(async () => {
    if (institutions.length > 0) return

    try {
      const localInstitutions = await institutionQueries.getAll()
      const items = await Promise.all(
        localInstitutions.map(async (institution) =>
          mapLocalInstitutionToListItem(
            institution,
            await institutionQueries.getAccountsCount(institution.id),
          ),
        ),
      )

      setInstitutions(items)
    } catch (error) {
      console.error('[TransactionForm] Failed to load institutions', error)
    }
  }, [institutions.length, setInstitutions])

  useFocusEffect(
    useCallback(() => {
      void loadCategories()
      void loadInstitutions()
    }, [loadCategories, loadInstitutions]),
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

  const institutionOptions = useMemo(
    () =>
      institutions.map((institution) => ({
        id: institution.id,
        label: institution.name,
        icon: institution.icon ?? 'landmark',
      })),
    [institutions],
  )

  const transferCategoryId = useMemo(
    () =>
      categoryOptions.find((category) => category.label.toLowerCase().includes('transfer'))?.id ??
      categoryOptions[0]?.id,
    [categoryOptions],
  )

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

  const selectedInstitution = institutionOptions.find(
    (institution) => institution.id === form.institutionId,
  )
  const selectedDestinationInstitution = institutionOptions.find(
    (institution) => institution.id === form.destinationInstitutionId,
  )
  const selectedCategory = categoryOptions.find((category) => category.id === form.categoryId)
  const destinationOptions = useMemo(
    () =>
      institutionOptions.filter((institution) => institution.id !== (form.institutionId || null)),
    [form.institutionId, institutionOptions],
  )

  const dismissSuccessAlert = useCallback(() => {
    setSuccessAlertVisible(false)
    onSuccess?.()
  }, [onSuccess])

  const handleSubmit = useCallback(() => {
    form.submit(
      () => {
        setSuccessAlertVisible(true)
      },
      { transferCategoryId },
    )
  }, [form, transferCategoryId])

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
    categories: categoryOptions,
    institutionOptions,
    selectedInstitution,
    selectedDestinationInstitution,
    selectedCategory,
    destinationOptions,
    showInstitutionPicker,
    setShowInstitutionPicker,
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
