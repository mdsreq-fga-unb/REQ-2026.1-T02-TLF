import { act, renderHook, waitFor } from '@testing-library/react-native'
import { budgetQueries } from '@/services/database/repository/budget'
import { categoryQueries } from '@/services/database/repository/category'
import { syncDatabase } from '@/services/database/sync'
import { useBudgetScreen } from './useBudgetScreen'

jest.mock('@/services/database/repository/budget', () => ({
  budgetQueries: {
    getAll: jest.fn(),
    getById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}))

jest.mock('@/services/database/repository/category', () => ({
  categoryQueries: {
    getAll: jest.fn(),
  },
}))

jest.mock('@/services/database/sync', () => ({
  syncDatabase: jest.fn().mockResolvedValue(undefined),
}))

jest.mock('expo-router', () => {
  const React = require('react')

  return {
    useFocusEffect: (effect: () => void | (() => void)) => React.useEffect(effect, []),
  }
})

const mockedBudgetQueries = jest.mocked(budgetQueries)
const mockedCategoryQueries = jest.mocked(categoryQueries)
const mockedSyncDatabase = jest.mocked(syncDatabase)

const categories = [
  { id: 'cat-1', name: 'Moradia', icon: 'house', color: '#ffffff' },
]
const budgets = [
  {
    id: 'budget-1',
    name: 'Aluguel',
    amountLimit: 150000,
    month: 4,
    year: 2026,
    categoryId: 'cat-1',
  },
]

describe('useBudgetScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockedCategoryQueries.getAll.mockResolvedValue(categories as never)
    mockedBudgetQueries.getAll.mockResolvedValue(budgets as never)
    mockedBudgetQueries.getById.mockResolvedValue(budgets[0] as never)
    mockedBudgetQueries.create.mockResolvedValue({ id: 'budget-2' } as never)
    mockedBudgetQueries.update.mockResolvedValue({ id: 'budget-1' } as never)
    mockedSyncDatabase.mockResolvedValue(undefined)
  })

  it('loads categories and initializes the screen', async () => {
    const { result } = renderHook(() => useBudgetScreen())

    await waitFor(() => expect(result.current.categoryOptions).toHaveLength(1))

    expect(result.current.name).toBe('')
    expect(result.current.type).toBe('BUDGET')
    expect(result.current.amountLimit).toBe(0)
    expect(result.current.categoryId).toBe('')
    expect(result.current.submitAttempted).toBe(false)
  })

  it('handles keypad input', async () => {
    const { result } = renderHook(() => useBudgetScreen())

    await waitFor(() => expect(result.current.submitAttempted).toBe(false))

    act(() => {
      result.current.handleKeypad('1')
      result.current.handleKeypad('2')
      result.current.handleKeypad('3')
    })

    expect(result.current.amountLimit).toBe(123)
  })

  it('changes type and clears category', async () => {
    const { result } = renderHook(() =>
      useBudgetScreen({ name: 'Budget', categoryId: 'cat-1', month: 4, year: 2026 }),
    )

    await waitFor(() => expect(result.current.selectedCategoryLabel).toBe('Moradia'))

    act(() => {
      result.current.handleTypeChange('GOAL')
    })

    expect(result.current.type).toBe('GOAL')
    expect(result.current.categoryId).toBe('')
  })

  it('creates a budget locally', async () => {
    const { result } = renderHook(() => useBudgetScreen())

    await waitFor(() => expect(result.current.submitAttempted).toBe(false))

    act(() => {
      result.current.setName('Monthly Budget')
      result.current.setCategoryId('cat-1')
      result.current.handleKeypad('1')
      result.current.handleKeypad('0')
      result.current.handleKeypad('0')
      result.current.handleKeypad('0')
      result.current.handleKeypad('0')
    })

    await act(async () => {
      await result.current.handleCreateSubmit()
    })

    expect(mockedBudgetQueries.create).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Monthly Budget',
        amountLimit: 10000,
        categoryId: 'cat-1',
      }),
    )
    expect(mockedSyncDatabase).toHaveBeenCalled()
  })

  it('fetches budget data from the local repository', async () => {
    const { result } = renderHook(() => useBudgetScreen())

    await waitFor(() => expect(result.current.submitAttempted).toBe(false))

    await act(async () => {
      await result.current.fetchBudget('budget-1')
    })

    expect(result.current.name).toBe('Aluguel')
    expect(result.current.amountLimit).toBe(150000)
    expect(result.current.month).toBe(3)
    expect(result.current.year).toBe(2026)
    expect(result.current.categoryId).toBe('cat-1')
  })

  it('fetches the budgets list locally', async () => {
    const { result } = renderHook(() => useBudgetScreen())

    await waitFor(() => expect(result.current.submitAttempted).toBe(false))

    await act(async () => {
      await result.current.fetchBudgets()
    })

    expect(result.current.budgets).toHaveLength(1)
    expect(result.current.budgets[0]).toMatchObject({
      id: 'budget-1',
      name: 'Aluguel',
      categoryId: 'cat-1',
    })
  })
})
