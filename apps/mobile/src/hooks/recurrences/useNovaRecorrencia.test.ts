import { act, renderHook } from '@testing-library/react-native'
import { router, useLocalSearchParams } from 'expo-router'
import { useNovaRecorrencia } from './useNovaRecorrencia'

jest.mock('expo-router', () => ({
  router: { back: jest.fn() },
  useLocalSearchParams: jest.fn(),
}))

const mockedBack = jest.mocked(router.back)
const mockedUseLocalSearchParams = jest.mocked(useLocalSearchParams)

describe('useNovaRecorrencia', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.useFakeTimers()
    mockedUseLocalSearchParams.mockReturnValue({})
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  it('starts the success timeout and navigates back after save', () => {
    const { result, unmount } = renderHook(() => useNovaRecorrencia())

    act(() => {
      result.current.handleKeypad('1')
      result.current.handleKeypad('0')
      result.current.handleKeypad('0')
      result.current.setDescription('Test recurrence')
      result.current.setStartDate(new Date())
    })

    act(() => {
      result.current.handleSave()
    })

    expect(result.current.showSuccess).toBe(true)

    act(() => {
      jest.advanceTimersByTime(1600)
    })

    expect(mockedBack).toHaveBeenCalledTimes(1)
    unmount()
  })
})
