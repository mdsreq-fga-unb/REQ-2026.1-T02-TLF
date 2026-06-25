import { Q } from '@nozbe/watermelondb'
import { database } from '@/services/database'
import { Recurrence as RecurrenceModel } from '@/services/database/models/recurrece'
import { Account } from '@/services/database/models/account'
import { Category } from '@/services/database/models/category'
import { SubCategory } from '@/services/database/models/subCategory'
import type { Recurrence } from '@/components/finance/recurrences/types'
import {
  categoryColors,
  categoryIcons,
  mockAccounts,
  mockCategories,
  mockRecurrences,
  mockSubcategories,
} from '@/components/finance/recurrences/recurrences-data'

export type RecurrenceLookupOption = {
  id: string
  name: string
  icon?: string
  color?: string
  categoryId?: string
}

export type RecurrenceLookupContext = {
  accountOptions: RecurrenceLookupOption[]
  categoryOptions: RecurrenceLookupOption[]
  subcategoryOptions: RecurrenceLookupOption[]
}

const toRecurrenceUi = (
  recurrence: RecurrenceModel,
  lookup: {
    accountMap: Map<string, RecurrenceLookupOption>
    categoryMap: Map<string, RecurrenceLookupOption>
    subcategoryMap: Map<string, RecurrenceLookupOption>
  },
): Recurrence => {
  const account = lookup.accountMap.get(recurrence.accountId)
  const category = recurrence.categoryId ? lookup.categoryMap.get(recurrence.categoryId) : undefined
  const subcategory = recurrence.subCategoryId
    ? lookup.subcategoryMap.get(recurrence.subCategoryId)
    : undefined

  return {
    id: recurrence.id,
    description: recurrence.description,
    amount: recurrence.amount / 100,
    type: 'EXPENSE',
    frequency: 'MONTHLY',
    dueDay: recurrence.chargeDate,
    accountId: recurrence.accountId,
    categoryId: recurrence.categoryId ?? '',
    subcategoryId: recurrence.subCategoryId ?? undefined,
    startDate: recurrence.startDate.toISOString().slice(0, 10),
    duration: 'INDEFINITE',
    isActive: recurrence.isActive,
    accountName: account?.name,
    categoryName: category?.name,
    subcategoryName: subcategory?.name,
  }
}

const buildFallbackAccountOptions = (): RecurrenceLookupOption[] =>
  mockAccounts.map((account) => ({
    id: account.id,
    name: account.name,
  }))

const buildFallbackCategoryOptions = (): RecurrenceLookupOption[] =>
  mockCategories.map((category) => ({
    id: category.id,
    name: category.name,
    icon: category.icon,
    color: categoryColors[category.id],
  }))

const buildFallbackSubcategoryOptions = (): RecurrenceLookupOption[] =>
  mockSubcategories.map((subcategory) => ({
    id: subcategory.id,
    name: subcategory.name,
    icon: categoryIcons[subcategory.categoryId],
    color: categoryColors[subcategory.categoryId],
    categoryId: subcategory.categoryId,
  }))

const buildLookupContext = (
  accounts: RecurrenceLookupOption[],
  categories: RecurrenceLookupOption[],
  subcategories: RecurrenceLookupOption[],
): RecurrenceLookupContext => ({
  accountOptions: accounts,
  categoryOptions: categories,
  subcategoryOptions: subcategories,
})

export async function loadRecurrenceLookupContext(): Promise<RecurrenceLookupContext> {
  const [accounts, categories, subcategories] = await Promise.all([
    database.get<Account>('accounts').query(Q.sortBy('created_at', 'desc')).fetch(),
    database.get<Category>('categories').query(Q.sortBy('created_at', 'desc')).fetch(),
    database.get<SubCategory>('sub_categories').query(Q.sortBy('created_at', 'desc')).fetch(),
  ])

  const accountOptions =
    accounts.length > 0
      ? accounts.map((account) => ({
          id: account.id,
          name: account.name,
        }))
      : buildFallbackAccountOptions()

  const categoryOptions =
    categories.length > 0
      ? categories.map((category) => ({
          id: category.id,
          name: category.name,
          icon: category.icon,
          color: category.color,
        }))
      : buildFallbackCategoryOptions()

  const subcategoryOptions =
    subcategories.length > 0
      ? subcategories.map((subcategory) => ({
          id: subcategory.id,
          name: subcategory.name,
          icon: categoryIcons[subcategory.categoryId] ?? 'tag',
          color: categoryColors[subcategory.categoryId] ?? '#4A5060',
          categoryId: subcategory.categoryId,
        }))
      : buildFallbackSubcategoryOptions()

  return buildLookupContext(accountOptions, categoryOptions, subcategoryOptions)
}

export async function loadRecurrenceItems(): Promise<Recurrence[]> {
  const [recurrences, context] = await Promise.all([
    database.get<RecurrenceModel>('recurrences').query(Q.sortBy('created_at', 'desc')).fetch(),
    loadRecurrenceLookupContext(),
  ])

  if (recurrences.length === 0) {
    return mockRecurrences
  }

  const accountMap = new Map(context.accountOptions.map((item) => [item.id, item]))
  const categoryMap = new Map(context.categoryOptions.map((item) => [item.id, item]))
  const subcategoryMap = new Map(context.subcategoryOptions.map((item) => [item.id, item]))

  return recurrences.map((recurrence) =>
    toRecurrenceUi(recurrence, {
      accountMap,
      categoryMap,
      subcategoryMap,
    }),
  )
}

export async function loadRecurrenceById(id: string): Promise<Recurrence | null> {
  const [recurrence, context] = await Promise.allSettled([
    database.get<RecurrenceModel>('recurrences').find(id),
    loadRecurrenceLookupContext(),
  ])

  if (recurrence.status === 'fulfilled' && context.status === 'fulfilled') {
    const accountMap = new Map(context.value.accountOptions.map((item) => [item.id, item]))
    const categoryMap = new Map(context.value.categoryOptions.map((item) => [item.id, item]))
    const subcategoryMap = new Map(context.value.subcategoryOptions.map((item) => [item.id, item]))

    return toRecurrenceUi(recurrence.value, {
      accountMap,
      categoryMap,
      subcategoryMap,
    })
  }

  return mockRecurrences.find((item) => item.id === id) ?? null
}

export function filterRecurrenceSubcategoryOptions(
  context: RecurrenceLookupContext,
  categoryId: string,
) {
  return context.subcategoryOptions.filter((subcategory) => subcategory.categoryId === categoryId)
}

export function getRecurrenceCategoryOption(
  context: RecurrenceLookupContext,
  categoryId: string,
): RecurrenceLookupOption | undefined {
  return context.categoryOptions.find((category) => category.id === categoryId)
}

export function getRecurrenceAccountOption(
  context: RecurrenceLookupContext,
  accountId: string,
): RecurrenceLookupOption | undefined {
  return context.accountOptions.find((account) => account.id === accountId)
}
