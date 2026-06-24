import type { Recurrence } from '@/components/finance/recurrences/types'
import type { CategoryDTO } from '@/services/api/category'
import type { RecurrenceApiDetail, RecurrenceApiItem } from '@/services/api/recurrences'
import type { IconKey } from '@/utils/icons'

const DEFAULT_ICON: IconKey = 'tag'
const DEFAULT_COLOR = '#4A5060'

export type CategoryLookup = Map<string, CategoryDTO>

export function buildCategoryLookup(categories: CategoryDTO[]): CategoryLookup {
  return new Map(categories.map((category) => [category.id, category]))
}

// A API retorna a data como ISO (timestamp); a UI trabalha com 'yyyy-mm-dd'.
function toDateOnly(iso?: string | null): string {
  if (!iso) return ''
  return iso.split('T')[0] ?? ''
}

export function mapApiRecurrenceToUi(
  recurrence: RecurrenceApiItem | RecurrenceApiDetail,
  categories?: CategoryLookup,
): Recurrence {
  const categoryId = recurrence.category?.id ?? ''
  const category = categoryId ? categories?.get(categoryId) : undefined
  const subCategory = 'subCategory' in recurrence ? recurrence.subCategory : undefined

  return {
    id: recurrence.id,
    description: recurrence.description,
    // amount é armazenado em centavos no backend.
    amount: recurrence.amount / 100,
    // O backend ainda não modela tipo/frequência; assumimos despesa mensal.
    type: 'EXPENSE',
    frequency: 'MONTHLY',
    dueDay: recurrence.chargeDate,
    institutionId: recurrence.institution.id,
    categoryId,
    subcategoryId: subCategory?.id,
    startDate: toDateOnly(recurrence.startDate),
    endDate: toDateOnly(recurrence.endDate) || undefined,
    duration: 'INDEFINITE',
    isActive: recurrence.isActive,
    institutionName: recurrence.institution.name,
    categoryName: recurrence.category?.name,
    subcategoryName: subCategory?.name,
    categoryIcon: (category?.icon as IconKey | undefined) ?? DEFAULT_ICON,
    categoryColor: category?.color ?? DEFAULT_COLOR,
  }
}
