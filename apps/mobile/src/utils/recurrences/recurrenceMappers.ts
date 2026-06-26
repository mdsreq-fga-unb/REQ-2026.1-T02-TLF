import type { Recurrence } from '@/components/finance/recurrences/types'
import type { CategoryDTO } from '@/services/api/category'
import type { RecurrenceApiDetail, RecurrenceApiItem } from '@/services/api/recurrences'
import type { Institution } from '@/services/database/models/institution'
import type { SubCategory } from '@/services/database/models/subCategory'
import type { IconKey } from '@/utils/icons'

const DEFAULT_ICON: IconKey = 'tag'
const DEFAULT_COLOR = '#4A5060'

export type CategoryLookup = Map<string, CategoryDTO>
export type InstitutionLookup = Map<string, Pick<Institution, 'id' | 'name'>>
export type SubcategoryLookup = Map<string, Pick<SubCategory, 'id' | 'name'>>

export function buildCategoryLookup(categories: CategoryDTO[]): CategoryLookup {
  return new Map(categories.map((category) => [category.id, category]))
}

export function buildInstitutionLookup(
  institutions: Pick<Institution, 'id' | 'name'>[],
): InstitutionLookup {
  return new Map(institutions.map((institution) => [institution.id, institution]))
}

export function buildSubcategoryLookup(
  subcategories: Pick<SubCategory, 'id' | 'name'>[],
): SubcategoryLookup {
  return new Map(subcategories.map((subcategory) => [subcategory.id, subcategory]))
}

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
    amount: recurrence.amount / 100,
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

type LocalRecurrenceLike = {
  id: string
  institutionId: string
  categoryId: string | null
  subCategoryId: string | null
  description: string
  amount: number
  isActive: boolean
  chargeDate: number
  startDate: Date
  endDate: Date | null
}

export function mapLocalRecurrenceToUi(
  recurrence: LocalRecurrenceLike,
  categories?: CategoryLookup,
  institutions?: InstitutionLookup,
  subcategories?: SubcategoryLookup,
): Recurrence {
  const category = recurrence.categoryId ? categories?.get(recurrence.categoryId) : undefined
  const institution = institutions?.get(recurrence.institutionId)
  const subcategory = recurrence.subCategoryId
    ? subcategories?.get(recurrence.subCategoryId)
    : undefined

  return {
    id: recurrence.id,
    description: recurrence.description,
    amount: recurrence.amount / 100,
    type: 'EXPENSE',
    frequency: 'MONTHLY',
    dueDay: recurrence.chargeDate,
    institutionId: recurrence.institutionId,
    categoryId: recurrence.categoryId ?? '',
    subcategoryId: recurrence.subCategoryId ?? undefined,
    startDate: toDateOnly(recurrence.startDate.toISOString()),
    endDate: recurrence.endDate ? toDateOnly(recurrence.endDate.toISOString()) : undefined,
    duration: 'INDEFINITE',
    isActive: recurrence.isActive,
    institutionName: institution?.name,
    categoryName: category?.name,
    subcategoryName: subcategory?.name,
    categoryIcon: (category?.icon as IconKey | undefined) ?? DEFAULT_ICON,
    categoryColor: category?.color ?? DEFAULT_COLOR,
  }
}
