import {
  categoryColors,
  categoryIcons,
  mockAccounts,
  mockCategories,
  mockPaymentHistory,
  mockRecurrences,
  mockSubcategories,
  type MockAccount,
  type MockCategory,
  type MockSubcategory,
  type PaymentHistoryEntry,
} from '@/utils/fixtures/recurrences'

export type { MockAccount, MockCategory, MockSubcategory, PaymentHistoryEntry }

export {
  categoryColors,
  categoryIcons,
  mockAccounts,
  mockCategories,
  mockPaymentHistory,
  mockRecurrences,
  mockSubcategories,
}

export const frequencyOptions = [
  { label: 'Mensal', value: 'MONTHLY' },
  { label: 'Semanal', value: 'WEEKLY' },
  { label: 'Anual', value: 'YEARLY' },
]

export function getAccount(id: string): MockAccount | undefined {
  return mockAccounts.find((account) => account.id === id)
}

export function getCategory(id: string): MockCategory | undefined {
  return mockCategories.find((category) => category.id === id)
}

export function getSubcategory(id: string): MockSubcategory | undefined {
  return mockSubcategories.find((subcategory) => subcategory.id === id)
}

export function getSubcategoriesForCategory(categoryId: string): MockSubcategory[] {
  return mockSubcategories.filter((subcategory) => subcategory.categoryId === categoryId)
}
