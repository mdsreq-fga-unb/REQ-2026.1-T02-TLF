import type { TransactionListItem } from 'types/types'
import {
  buildCategoryData,
  buildCategoryOptions,
  buildSummaryData,
  filterTransactions,
} from './recordsCalculations'

const sampleTransactions: TransactionListItem[] = [
  {
    id: '1',
    description: 'Salario',
    category: 'Salario',
    type: 'INCOME',
    date: new Date('2026-04-30'),
    amount: 5000,
  },
  {
    id: '2',
    description: 'Aluguel',
    category: 'Moradia',
    type: 'EXPENSE',
    date: new Date('2026-05-01'),
    amount: 1800,
  },
  {
    id: '3',
    description: 'Supermercado',
    category: 'Alimentacao',
    type: 'EXPENSE',
    date: new Date('2026-05-02'),
    amount: 320,
  },
]

describe('recordsCalculations', () => {
  it('buildCategoryOptions returns unique categories from transactions', () => {
    expect(buildCategoryOptions(sampleTransactions, ['Fallback'])).toEqual([
      'Salario',
      'Moradia',
      'Alimentacao',
    ])
  })

  it('buildCategoryOptions falls back when transactions have no categories', () => {
    expect(buildCategoryOptions([], ['Fallback A', 'Fallback B'])).toEqual([
      'Fallback A',
      'Fallback B',
    ])
  })

  it('filterTransactions applies category, type, and search filters', () => {
    const filtered = filterTransactions(sampleTransactions, {
      categoryFilter: 'Moradia',
      typeFilter: 'ALL',
      searchQuery: '',
    })

    expect(filtered).toHaveLength(1)
    expect(filtered[0].description).toBe('Aluguel')
  })

  it('filterTransactions matches search query on description and category', () => {
    const filtered = filterTransactions(sampleTransactions, {
      categoryFilter: 'Todas',
      typeFilter: 'ALL',
      searchQuery: 'super',
    })

    expect(filtered).toHaveLength(1)
    expect(filtered[0].category).toBe('Alimentacao')
  })

  it('buildSummaryData calculates balance from income and expense', () => {
    expect(buildSummaryData(sampleTransactions)).toEqual({
      balance: 5000 - 1800 - 320,
      income: 5000,
      expense: 2120,
    })
  })

  it('buildCategoryData aggregates amounts by category with colors', () => {
    const data = buildCategoryData(sampleTransactions)

    expect(data).toHaveLength(3)
    expect(data.find((item) => item.name === 'Moradia')).toMatchObject({
      amount: 1800,
    })
    expect(data.every((item) => item.color.length > 0)).toBe(true)
  })
})
