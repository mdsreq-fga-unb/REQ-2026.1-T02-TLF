import { renderHook, act, waitFor } from '@testing-library/react-native'
import { mockTransactions } from '@/utils/fixtures/records'
import { router } from 'expo-router'
import { useRecordsScreen } from './useRecordsScreen'

jest.mock('@/services/database/queries/transaction', () => ({
  transactionQueries: {
    getAll: jest.fn(),
    delete: jest.fn(),
  },
}))

jest.mock('@/services/api/transactions', () => ({
  listTransactions: jest.fn(),
  listTransactionsByCategory: jest.fn(),
  listTransactionsByType: jest.fn(),
  deleteTransaction: jest.fn(),
}))

jest.mock('expo-router', () => ({
  router: { push: jest.fn(), replace: jest.fn(), back: jest.fn() },
}))

const mockedPush = jest.mocked(router.push)

describe('useRecordsScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('loads mock transactions on mount', async () => {
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
        categoryId: transaction.category,
        description: transaction.description,
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
