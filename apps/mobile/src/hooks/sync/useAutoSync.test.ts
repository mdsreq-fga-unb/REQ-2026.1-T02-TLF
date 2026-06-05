import { renderHook } from '@testing-library/react-native'
import { AppState, type AppStateStatus } from 'react-native'
import NetInfo, { type NetInfoState } from '@react-native-community/netinfo'
import { useAutoSync } from './useAutoSync'
import { trySync } from '@/services/sync'

jest.mock('@/services/sync', () => ({ trySync: jest.fn() }))
jest.mock('@react-native-community/netinfo', () => ({
  __esModule: true,
  default: { addEventListener: jest.fn(() => jest.fn()) },
}))

const mockedTrySync = jest.mocked(trySync)
const mockedNetListener = jest.mocked(NetInfo.addEventListener)

const netState = (partial: Partial<NetInfoState>) => partial as NetInfoState

let appStateHandler: (status: AppStateStatus) => void

describe('useAutoSync', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.spyOn(AppState, 'addEventListener').mockImplementation((_event, handler) => {
      appStateHandler = handler as (status: AppStateStatus) => void
      return { remove: jest.fn() } as never
    })
  })

  const emitNet = (state: NetInfoState) => {
    const listener = mockedNetListener.mock.calls[0][0]
    listener(state)
  }

  it('syncs only on the offline → online transition', () => {
    renderHook(() => useAutoSync())

    // First event (online) must not sync — previous state is unknown.
    emitNet(netState({ isConnected: true, isInternetReachable: true }))
    expect(mockedTrySync).not.toHaveBeenCalled()

    // Drop offline, then come back online → one sync.
    emitNet(netState({ isConnected: false, isInternetReachable: false }))
    emitNet(netState({ isConnected: true, isInternetReachable: true }))
    expect(mockedTrySync).toHaveBeenCalledTimes(1)
  })

  it('does not sync while staying offline', () => {
    renderHook(() => useAutoSync())

    emitNet(netState({ isConnected: false, isInternetReachable: false }))
    emitNet(netState({ isConnected: false, isInternetReachable: false }))
    expect(mockedTrySync).not.toHaveBeenCalled()
  })

  it('syncs when the app returns to the foreground', () => {
    renderHook(() => useAutoSync())

    appStateHandler('active')
    expect(mockedTrySync).toHaveBeenCalledTimes(1)

    appStateHandler('background')
    expect(mockedTrySync).toHaveBeenCalledTimes(1)
  })

  it('unsubscribes on unmount', () => {
    const unsubscribeNet = jest.fn()
    mockedNetListener.mockReturnValueOnce(unsubscribeNet)
    const remove = jest.fn()
    jest.spyOn(AppState, 'addEventListener').mockImplementation((_event, handler) => {
      appStateHandler = handler as (status: AppStateStatus) => void
      return { remove } as never
    })

    const { unmount } = renderHook(() => useAutoSync())
    unmount()

    expect(unsubscribeNet).toHaveBeenCalledTimes(1)
    expect(remove).toHaveBeenCalledTimes(1)
  })
})
