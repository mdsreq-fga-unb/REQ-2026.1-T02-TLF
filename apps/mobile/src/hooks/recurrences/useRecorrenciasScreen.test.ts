import { act, renderHook, waitFor } from '@testing-library/react-native'
import { useRecorrenciasScreen } from './useRecorrenciasScreen'
import { useRecurrencesStore } from '@/stores/recurrences'

jest.mock('expo-router', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const React = require('react')

  return {
    useFocusEffect: (effect: () => void | (() => void)) => React.useEffect(effect, []),
  }
})

jest.mock('@/services/database/repository/category', () => ({
  categoryQueries: {
    getAll: jest.fn(),
  },
}))

jest.mock('@/services/database/queries/institution', () => ({
  institutionQueries: {
    getAll: jest.fn(),
  },
}))

jest.mock('@/services/database/repository/subCategory', () => ({
  subCategoryQueries: {
    getAll: jest.fn(),
  },
}))

jest.mock('@/services/database/repository/recurrece', () => ({
  recurrenceQueries: {
    getAll: jest.fn(),
    getById: jest.fn(),
    update: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
  },
}))

jest.mock('@/services/database/repository/transaction', () => ({
  transactionQueries: {
    getByFilters: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
  },
}))

jest.mock('@/services/database/sync', () => ({
  syncDatabase: jest.fn().mockResolvedValue(undefined),
}))

const mockedCategoryQueries = jest.mocked(
  jest.requireMock('@/services/database/repository/category').categoryQueries,
)
const mockedInstitutionQueries = jest.mocked(
  jest.requireMock('@/services/database/queries/institution').institutionQueries,
)
const mockedSubCategoryQueries = jest.mocked(
  jest.requireMock('@/services/database/repository/subCategory').subCategoryQueries,
)
const mockedRecurrenceQueries = jest.mocked(
  jest.requireMock('@/services/database/repository/recurrece').recurrenceQueries,
)
const mockedTransactionQueries = jest.mocked(
  jest.requireMock('@/services/database/repository/transaction').transactionQueries,
)

const localRecurrence = {
  id: 'rec-1',
  description: 'Netflix',
  amount: 2990,
  chargeDate: 10,
  startDate: new Date('2026-01-10T00:00:00.000Z'),
  endDate: null,
  isActive: true,
  institutionId: 'inst-1',
  categoryId: 'cat-1',
  subCategoryId: null,
}

describe('useRecorrenciasScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockedCategoryQueries.getAll.mockResolvedValue([
      { id: 'cat-1', name: 'Assinaturas', icon: 'repeat', color: '#fff' },
    ] as never)
    mockedInstitutionQueries.getAll.mockResolvedValue([{ id: 'inst-1', name: 'Nubank' }] as never)
    mockedSubCategoryQueries.getAll.mockResolvedValue([] as never)
    mockedRecurrenceQueries.getAll.mockResolvedValue([localRecurrence] as never)
    mockedTransactionQueries.getByFilters.mockResolvedValue([] as never)
    mockedTransactionQueries.create.mockResolvedValue(undefined as never)
    mockedTransactionQueries.delete.mockResolvedValue(undefined as never)
    mockedRecurrenceQueries.update.mockResolvedValue(undefined as never)
    useRecurrencesStore.setState({ monthKey: null, confirmedIds: [], skippedIds: [] })
  })

  it('carrega recorrências locais', async () => {
    const { result } = renderHook(() => useRecorrenciasScreen())

    await waitFor(() => expect(result.current.recurrences.length).toBe(1))

    expect(result.current.recurrences[0]).toMatchObject({
      id: 'rec-1',
      description: 'Netflix',
      institutionName: 'Nubank',
      categoryName: 'Assinaturas',
    })
  })

  it('confirma a recorrência criando a transação localmente', async () => {
    const { result } = renderHook(() => useRecorrenciasScreen())

    await waitFor(() => expect(result.current.recurrences.length).toBe(1))

    await act(async () => {
      await result.current.handleConfirmRecurrence('rec-1')
    })

    expect(mockedTransactionQueries.create).toHaveBeenCalledTimes(1)
    expect(result.current.confirmedIds).toContain('rec-1')
  })

  it('desfaz uma confirmação removendo transações locais vinculadas', async () => {
    mockedTransactionQueries.getByFilters
      .mockResolvedValueOnce([] as never)
      .mockResolvedValueOnce([{ id: 'tx-1' }] as never)

    const { result } = renderHook(() => useRecorrenciasScreen())

    await waitFor(() => expect(result.current.recurrences.length).toBe(1))

    await act(async () => {
      await result.current.handleConfirmRecurrence('rec-1')
    })

    await act(async () => {
      await result.current.handleUndoRecurrence('rec-1')
    })

    expect(mockedTransactionQueries.delete).toHaveBeenCalledWith('tx-1')
    expect(result.current.confirmedIds).not.toContain('rec-1')
  })

  it('permite pular uma recorrência sem chamar backend', async () => {
    const { result } = renderHook(() => useRecorrenciasScreen())

    await waitFor(() => expect(result.current.recurrences.length).toBe(1))

    act(() => {
      result.current.handleSkipRecurrence('rec-1')
    })

    expect(result.current.skippedIds).toContain('rec-1')
    expect(mockedTransactionQueries.create).not.toHaveBeenCalled()
  })
})
