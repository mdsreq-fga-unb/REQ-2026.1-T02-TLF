import { renderHook, act, waitFor } from '@testing-library/react-native'
import { mockTransactions } from '@/utils/fixtures/records'
import { router } from 'expo-router'
import { useRecordsScreen } from './useRecordsScreen'

jest.mock('@/services/database/repository/transaction', () => ({
  transactionQueries: {
    getAll: jest.fn(),
    getByFilters: jest.fn(),
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

jest.mock('@/utils/records/transactionMappers', () => ({
  mapLocalTransactionToListItem: jest.fn((transaction) => transaction),
}))

jest.mock('expo-router', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const React = require('react')

  return {
    router: { push: jest.fn(), replace: jest.fn(), back: jest.fn() },
    useFocusEffect: (effect: () => void | (() => void)) => React.useEffect(effect, []),
  }
})

const mockedPush = jest.mocked(router.push)
const mockedTransactionQueries = jest.mocked(
  jest.requireMock('@/services/database/repository/transaction').transactionQueries,
)
const mockedCategoryQueries = jest.mocked(
  jest.requireMock('@/services/database/repository/category').categoryQueries,
)

describe('useRecordsScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockedTransactionQueries.getAll.mockResolvedValue(mockTransactions as never)
    mockedCategoryQueries.getAll.mockResolvedValue([] as never)
  })

  it('loads transactions on mount', async () => {
    const { result } = renderHook(() => useRecordsScreen())

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.filteredTransactions).toHaveLength(mockTransactions.length)
    expect(result.current.error).toBeNull()
  })

  it('filters transactions by search query', async () => {
    const { result } = renderHook(() => useRecordsScreen())

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    act(() => {
      result.current.setSearchQuery('Aluguel')
    })

    expect(result.current.filteredTransactions).toHaveLength(1)
    expect(result.current.filteredTransactions[0].description).toBe('Aluguel')
  })

  it('computes summary from filtered transactions', async () => {
    const { result } = renderHook(() => useRecordsScreen())

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    act(() => {
      result.current.setTypeFilter('INCOME')
    })

    expect(result.current.summaryData.income).toBeGreaterThan(0)
    expect(result.current.summaryData.expense).toBe(0)
  })

  it('navigates to edit screen with transaction params', async () => {
    const { result } = renderHook(() => useRecordsScreen())

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    const transaction = result.current.filteredTransactions[0]

    act(() => {
      result.current.handleEdit(transaction)
    })

    expect(mockedPush).toHaveBeenCalledWith({
      pathname: '/edit-record/[id]',
      params: {
        id: transaction.id,
        type: transaction.type,
        amount: transaction.amount.toString(),
        categoryId: transaction.categoryId,
        subcategoryId: transaction.subcategoryId || '',
        institutionId: transaction.institutionId,
        destinationInstitutionId: transaction.destinationInstitutionId || '',
        description: transaction.description,
        date:
          typeof transaction.date === 'string'
            ? transaction.date
            : new Date(transaction.date).toISOString(),
      },
    })
  })

  it('removes transaction on delete confirmation', async () => {
    const { result } = renderHook(() => useRecordsScreen())

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    const initialCount = result.current.filteredTransactions.length
    const targetId = result.current.filteredTransactions[0].id

    act(() => {
      result.current.handleDelete(targetId)
    })

    expect(result.current.alert).not.toBeNull()

    act(() => {
      const deleteAction = result.current.alert?.actions.find(
        (action) => action.label === 'Excluir',
      )
      deleteAction?.onPress()
    })

    await waitFor(() => {
      expect(result.current.filteredTransactions).toHaveLength(initialCount - 1)
    })

    expect(result.current.filteredTransactions.some((item) => item.id === targetId)).toBe(false)
  })
})
