import { act, renderHook, waitFor } from '@testing-library/react-native'
import { useLocalSearchParams } from 'expo-router'
import { useNovaRecorrencia } from './useNovaRecorrencia'
import { categoryQueries } from '@/services/database/repository/category'
import { recurrenceQueries } from '@/services/database/repository/recurrece'

jest.mock('expo-router', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const React = require('react')

  return {
    router: { back: jest.fn() },
    useLocalSearchParams: jest.fn(),
    useFocusEffect: (effect: () => void | (() => void)) => React.useEffect(effect, []),
  }
})

jest.mock('@/services/database/repository/category', () => ({
  categoryQueries: {
    getAll: jest.fn().mockResolvedValue([{ id: 'cat-1', name: 'Categoria', icon: 'tag', color: '#fff' }]),
  },
}))

jest.mock('@/services/database/repository/recurrece', () => ({
  recurrenceQueries: {
    create: jest.fn().mockResolvedValue({}),
    update: jest.fn().mockResolvedValue({}),
  },
}))

jest.mock('@/services/database/queries/institution', () => ({
  institutionQueries: {
    getAll: jest.fn().mockResolvedValue([{ id: 'inst-1', name: 'Nubank' }]),
  },
}))

jest.mock('@/services/database/repository/subCategory', () => ({
  subCategoryQueries: { getAll: jest.fn().mockResolvedValue([]) },
}))

jest.mock('@/services/database/sync', () => ({
  syncDatabase: jest.fn().mockResolvedValue(undefined),
}))

const mockedUseLocalSearchParams = jest.mocked(useLocalSearchParams)
const mockedCreate = jest.mocked(recurrenceQueries.create)
const mockedUpdate = jest.mocked(recurrenceQueries.update)
const mockedGetCategories = jest.mocked(categoryQueries.getAll)

describe('useNovaRecorrencia', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockedUseLocalSearchParams.mockReturnValue({})
    mockedGetCategories.mockResolvedValue([{ id: 'cat-1', name: 'Categoria', icon: 'tag', color: '#fff' }])
  })

  it('loads institutions and categories defaults from real data', async () => {
    const { result, unmount } = renderHook(() => useNovaRecorrencia())

    await waitFor(() => expect(result.current.institutionId).toBe('inst-1'))
    expect(result.current.categoryId).toBe('cat-1')
    unmount()
  })

  it('submits the recurrence to the API with the mapped payload', async () => {
    // Rejeitamos para exercitar o caminho de erro, que não agenda o timer de sucesso
    // e portanto encerra de forma determinística mantendo a asserção do payload real.
    mockedCreate.mockRejectedValueOnce(new Error('falha'))

    const { result, unmount } = renderHook(() => useNovaRecorrencia())

    await waitFor(() => expect(result.current.institutionId).toBe('inst-1'))

    act(() => {
      result.current.handleKeypad('1')
      result.current.handleKeypad('0')
      result.current.handleKeypad('0')
      result.current.setDescription('Test recurrence')
      result.current.setStartDate(new Date(2026, 0, 5))
    })

    await act(async () => {
      await result.current.handleSave()
    })

    expect(mockedCreate).toHaveBeenCalledTimes(1)
    expect(mockedCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        institutionId: 'inst-1',
        categoryId: 'cat-1',
        amount: 100,
        description: 'Test recurrence',
        chargeDate: 1,
        isActive: true,
      }),
    )
    await waitFor(() => expect(result.current.feedbackMessage).toBeTruthy())
    unmount()
  })

  it('does not call the API when required fields are missing', async () => {
    const { result, unmount } = renderHook(() => useNovaRecorrencia())

    await waitFor(() => expect(result.current.institutionId).toBe('inst-1'))

    await act(async () => {
      await result.current.handleSave()
    })

    expect(mockedCreate).not.toHaveBeenCalled()
    expect(result.current.errors.amount).toBeTruthy()
    unmount()
  })

  it('na edição envia apenas os campos alterados (não reenvia período inalterado)', async () => {
    mockedUseLocalSearchParams.mockReturnValue({
      id: 'rec-1',
      description: 'Netflix',
      amount: '29.9',
      dueDay: '10',
      institutionId: 'inst-1',
      categoryId: 'cat-1',
      startDate: '2026-01-10',
      isActive: '1',
    })

    const { result, unmount } = renderHook(() => useNovaRecorrencia())

    await waitFor(() => expect(result.current.institutionId).toBe('inst-1'))

    act(() => {
      result.current.setIsActive(false)
    })

    await act(async () => {
      await result.current.handleScopeConfirm('upcoming')
    })

    expect(mockedUpdate).toHaveBeenCalledTimes(1)
    const [calledId, payload] = mockedUpdate.mock.calls[0]
    expect(calledId).toBe('rec-1')
    expect(payload).toEqual(expect.objectContaining({ isActive: false }))
    expect(payload).not.toHaveProperty('startDate')
    expect(payload).not.toHaveProperty('chargeDate')
    expect(payload).not.toHaveProperty('description')
    expect(payload).not.toHaveProperty('amount')
    unmount()
  })
})
