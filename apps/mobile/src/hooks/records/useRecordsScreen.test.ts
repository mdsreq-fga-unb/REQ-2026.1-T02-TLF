import { renderHook, act, waitFor } from '@testing-library/react-native'
import { router } from 'expo-router'
import { useRecordsScreen } from './useRecordsScreen'

// Reactive WatermelonDB source: a controllable fake observable. `mockRows` is the
// current emission; `mockEmit` lets the "delete" mock push a new list, mirroring
// WatermelonDB re-emitting after a local write.
let mockRows: Array<{
  id: string
  description: string
  categoryId: string | null
  type: 'EXPENSE' | 'INCOME' | 'TRANSFER'
  date: Date
  amount: number
}> = []
let mockEmit: (rows: typeof mockRows) => void = () => {}

jest.mock('@/services/database/queries/transaction', () => ({
  observeTransactions: jest.fn(() => ({
    subscribe: (cb: (rows: typeof mockRows) => void) => {
      mockEmit = cb
      cb(mockRows)
      return { unsubscribe: jest.fn() }
    },
  })),
  markTransactionAsDeleted: jest.fn(async (id: string) => {
    mockRows = mockRows.filter((row) => row.id !== id)
    mockEmit(mockRows)
  }),
}))

jest.mock('@/services/sync', () => ({
  trySync: jest.fn().mockResolvedValue(true),
}))

jest.mock('expo-router', () => ({
  router: { push: jest.fn(), replace: jest.fn(), back: jest.fn() },
}))

const mockedPush = jest.mocked(router.push)

const buildRows = () => [
  {
    id: '1',
    description: 'Aluguel',
    categoryId: 'Moradia',
    type: 'EXPENSE' as const,
    date: new Date('2026-01-05'),
    amount: 1500,
  },
  {
    id: '2',
    description: 'Salário',
    categoryId: 'Trabalho',
    type: 'INCOME' as const,
    date: new Date('2026-01-01'),
    amount: 5000,
  },
  {
    id: '3',
    description: 'Mercado',
    categoryId: 'Alimentação',
    type: 'EXPENSE' as const,
    date: new Date('2026-01-03'),
    amount: 300,
  },
]

describe('useRecordsScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockRows = buildRows()
  })

  it('loads transactions reactively from WatermelonDB on mount', async () => {
    const { result } = renderHook(() => useRecordsScreen())

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.filteredTransactions).toHaveLength(mockRows.length)
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

    await act(async () => {
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
