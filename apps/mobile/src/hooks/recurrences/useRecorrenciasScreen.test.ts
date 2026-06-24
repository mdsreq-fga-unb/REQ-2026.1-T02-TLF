import { act, renderHook, waitFor } from '@testing-library/react-native'
import { useRecorrenciasScreen } from './useRecorrenciasScreen'
import { confirmRecurrence, listRecurrences, unconfirmRecurrence } from '@/services/api/recurrences'
import { useRecurrencesStore } from '@/stores/recurrences'

jest.mock('expo-router', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const React = require('react')

  return {
    useFocusEffect: (effect: () => void | (() => void)) => React.useEffect(effect, []),
  }
})

jest.mock('@/services/api/recurrences', () => ({
  listRecurrences: jest.fn(),
  updateRecurrence: jest.fn().mockResolvedValue({}),
  confirmRecurrence: jest.fn().mockResolvedValue({ created: true }),
  unconfirmRecurrence: jest.fn().mockResolvedValue({ removed: true, count: 1 }),
}))

jest.mock('@/services/api/category', () => ({
  getCategories: jest
    .fn()
    .mockResolvedValue([{ id: 'cat-1', name: 'Assinaturas', icon: 'repeat', color: '#fff' }]),
}))

jest.mock('@/services/database/sync', () => ({
  syncDatabase: jest.fn().mockResolvedValue(undefined),
}))

const mockedList = jest.mocked(listRecurrences)
const mockedConfirm = jest.mocked(confirmRecurrence)
const mockedUnconfirm = jest.mocked(unconfirmRecurrence)

const apiRecurrence = {
  id: 'rec-1',
  description: 'Netflix',
  amount: 2990,
  chargeDate: 10,
  startDate: '2026-01-10T00:00:00.000Z',
  endDate: null,
  isActive: true,
  category: { id: 'cat-1', name: 'Assinaturas' },
  institution: { id: 'inst-1', name: 'Nubank' },
}

describe('useRecorrenciasScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockedList.mockResolvedValue({ data: [apiRecurrence] })
    useRecurrencesStore.setState({ monthKey: null, confirmedIds: [], skippedIds: [] })
  })

  it('confirma a recorrência via endpoint complete-or-create', async () => {
    const { result, unmount } = renderHook(() => useRecorrenciasScreen())

    await waitFor(() => expect(result.current.recurrences.length).toBe(1))

    await act(async () => {
      await result.current.handleConfirmRecurrence('rec-1')
    })

    expect(mockedConfirm).toHaveBeenCalledTimes(1)
    expect(mockedConfirm).toHaveBeenCalledWith('rec-1')
    expect(result.current.confirmedIds).toContain('rec-1')
    unmount()
  })

  it('reverte a confirmação quando o endpoint falha', async () => {
    mockedConfirm.mockRejectedValueOnce(new Error('falha'))

    const { result, unmount } = renderHook(() => useRecorrenciasScreen())

    await waitFor(() => expect(result.current.recurrences.length).toBe(1))

    await act(async () => {
      await result.current.handleConfirmRecurrence('rec-1')
    })

    expect(result.current.confirmedIds).not.toContain('rec-1')
    unmount()
  })

  it('desfazer um confirmado remove a transação no backend', async () => {
    const { result, unmount } = renderHook(() => useRecorrenciasScreen())

    await waitFor(() => expect(result.current.recurrences.length).toBe(1))

    await act(async () => {
      await result.current.handleConfirmRecurrence('rec-1')
    })
    expect(result.current.confirmedIds).toContain('rec-1')

    await act(async () => {
      await result.current.handleUndoRecurrence('rec-1')
    })

    expect(mockedUnconfirm).toHaveBeenCalledWith('rec-1')
    expect(result.current.confirmedIds).not.toContain('rec-1')
    unmount()
  })

  it('desfazer um pulado não chama o backend', async () => {
    const { result, unmount } = renderHook(() => useRecorrenciasScreen())

    await waitFor(() => expect(result.current.recurrences.length).toBe(1))

    act(() => {
      result.current.handleSkipRecurrence('rec-1')
    })
    expect(result.current.skippedIds).toContain('rec-1')

    await act(async () => {
      await result.current.handleUndoRecurrence('rec-1')
    })

    expect(mockedUnconfirm).not.toHaveBeenCalled()
    expect(result.current.skippedIds).not.toContain('rec-1')
    unmount()
  })

  it('reverte o desfazer quando o endpoint falha', async () => {
    mockedUnconfirm.mockRejectedValueOnce(new Error('falha'))

    const { result, unmount } = renderHook(() => useRecorrenciasScreen())

    await waitFor(() => expect(result.current.recurrences.length).toBe(1))

    await act(async () => {
      await result.current.handleConfirmRecurrence('rec-1')
    })

    await act(async () => {
      await result.current.handleUndoRecurrence('rec-1')
    })

    // Falhou ao desfazer: volta a marcar como confirmado.
    expect(result.current.confirmedIds).toContain('rec-1')
    unmount()
  })
})
